import express from 'express';
import http from 'https';
var CronJob = require('cron').CronJob;

import { webhooks } from "./webhooks"

const app = express();
export { app as routes };

// https://documenter.getpostman.com/view/1296288/UzQuNk3E#325b0a97-08e5-405b-801a-42e7a79d5ba7
var eskomSePushStatus: any = {};

// https://documenter.getpostman.com/view/1296288/UzQuNk3E#1881472b-c959-4259-b574-177feb5e0cda
var eskomSePushAreaData: any = {}; 

var area_id = process.env.AREA_ID;
var token = process.env.TOKEN
var statusArea = process.env.STATUS_AREA // eskom | capetown https://documenter.getpostman.com/view/1296288/UzQuNk3E#325b0a97-08e5-405b-801a-42e7a79d5ba7

var notificationTimes = {
    // cron schedules for the next event
    warning: new Date(4000, 1, 1),
    action: new Date(4000, 1, 1),
    started: false
};

async function getEskomSePushStatus() {
    return new Promise( result => {
        const options = {
            hostname: 'developer.sepush.co.za',
            path: 'business/2.0/status',
            method: 'GET',
            headers: {
                'Token': token
            }
        };
        result(get(options));
    })
}

async function getEskomSePushAreaData() {
    return new Promise( result => {
        const options = {
            hostname: 'developer.sepush.co.za',
            path: `business/2.0/area?id=${area_id}`,
            method: 'GET',
            headers: {
                'Token': token
            }
        };
        result(get(options));
    })
}


async function get(options) {
    var data = {};
    return new Promise( result => {
        http.get(options, function (res) {
        var json = '';
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    data = JSON.parse(json);
                    
                    result(data);
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
        }).on('error', function (err) {
            console.log('Error:', err);
        });
    })
}

async function webhook(endpoint, headers, body) {
    return new Promise( result => {
        fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    })
}

app.get('/', (req, res) => {
    res.send(
      {
        message: "greetings"
      }
    );
});

app.get('/status', async (req, res) => {
    if (Object.keys(eskomSePushStatus).length === 0 ) {
        console.log('Status not yet populated, grabbing status')
        eskomSePushStatus = await getEskomSePushStatus();
    }
    res.send(
        eskomSePushStatus
    )
});

app.get('/area', async (req, res) => {
    if (Object.keys(eskomSePushAreaData).length === 0 ) {
        console.log('Area not yet populated, grabbing area')
        eskomSePushAreaData = await getEskomSePushAreaData();
    }
    res.send(
        eskomSePushAreaData
    )
});

app.get('/test', (req, res) => {
    console.log("Testing notification webhooks...");
    let body = {
        message: "Loadshedding Notification",
        type: "test",
        stage: "0",
        event: new Date()
    }
    for (var endpoint in webhooks.warnings){
        webhook(webhooks.warnings[endpoint].endpoint, webhooks.warnings[endpoint].headers, body)
    }
    res.send(
        {'message': "tested webhooks"}
    )
});

// every thirty mins * */30 * * * *
const cronUpdateData = new CronJob('* */30 * * * *', async() => {
    const d = new Date();
    let newEskomSePushStatus: any = await getEskomSePushStatus();
    let newEskomSePushAreaData: any = await getEskomSePushAreaData();

    if (Object.keys(eskomSePushStatus).length != 0){
        // check if stage is 0. If so, can stop all cron
        if (newEskomSePushStatus.status[statusArea].stage === "0"){
            console.log("Loadshedding now zero, stop and clear all timers");
            cronAction.stop();
            cronNotify.stop();
            notificationTimes.started = false;
            return
        }

        // notify of stage change
        if (newEskomSePushStatus.status[statusArea].stage != eskomSePushStatus.status[statusArea].stage){
            console.log("Re notify because loadshedding stage has changed")
            let body = {
                message: "Loadshedding Notification",
                type: "stage-change",
                stage: newEskomSePushStatus.status[statusArea].stage,
                event: new Date()
            }
            for (var endpoint in webhooks.warnings){
                webhook(webhooks.warnings[endpoint].endpoint, webhooks.warnings[endpoint].headers, body);
            }
        }

        // setup cron schedules for notifications and actions.
        let nextEvent = new Date();
        for(let event in newEskomSePushAreaData.events){
            if (new Date(newEskomSePushAreaData.events[event].start) > nextEvent){
                nextEvent = new Date(newEskomSePushAreaData.events[event].start);
                break;
            }
        }
        let nextNotification = new Date(nextEvent);
        nextNotification.setHours(nextEvent.getHours()-1);

        notificationTimes.action = nextEvent ;
        notificationTimes.warning = nextNotification;

        console.log("load shedding stage: " + newEskomSePushStatus.status[statusArea].stage);
        console.log("next event for " + newEskomSePushAreaData.info.name + ": " + nextEvent);
        console.log("next notification time: " + nextNotification);

        if (!notificationTimes.started) {
            cronAction.start();
            cronNotify.start();
            notificationTimes.started = true;
        }
    }
    eskomSePushAreaData = newEskomSePushAreaData;
    eskomSePushStatus = newEskomSePushStatus;
});

const cronAction = new CronJob(notificationTimes.action, function() {
    console.log("Fire webhooks to action something")
    let body = {
        message: "Loadshedding Notification",
        type: "warning",
        stage: eskomSePushStatus.status[statusArea].stage,
        event: notificationTimes.warning
    }
    for (var endpoint in webhooks.warnings){
        webhook(webhooks.warnings[endpoint].endpoint, webhooks.warnings[endpoint].headers, body)
    }
});

const cronNotify = new CronJob(notificationTimes.warning, function() {
    console.log("Fire webhooks to warn about loadshedding")
    let body = {
        message: "Loadshedding Imminent, perform necessary actions",
        type: "action",
        stage: eskomSePushStatus.status[statusArea].stage,
        event: notificationTimes.action
    }
    for (var endpoint in webhooks.actions){
        webhook(webhooks.actions[endpoint].endpoint, webhooks.actions[endpoint].headers, body)
    }
});

cronUpdateData.start();