import express from 'express';

const app = express();
export { app as routes };

// https://documenter.getpostman.com/view/1296288/UzQuNk3E#325b0a97-08e5-405b-801a-42e7a79d5ba7
var eskomSePushStatus = {
    "status": {
        "capetown": {
            "name": "Cape Town",
            "next_stages": [
                {
                    "stage": "5",
                    "stage_start_timestamp": "2022-09-19T20:00:00+02:00"
                },
                {
                    "stage": "6",
                    "stage_start_timestamp": "2022-09-19T22:00:00+02:00"
                },
                {
                    "stage": "5",
                    "stage_start_timestamp": "2022-09-20T00:00:00+02:00"
                }
            ],
            "stage": "4",
            "stage_updated": "2022-09-19T05:00:33.994400+02:00"
        },
        "eskom": {
            "name": "National",
            "next_stages": [
                {
                    "stage": "5",
                    "stage_start_timestamp": "2022-09-20T00:00:00+02:00"
                }
            ],
            "stage": "6",
            "stage_updated": "2022-09-18T04:49:16.748418+02:00"
        }
    }
};

// https://documenter.getpostman.com/view/1296288/UzQuNk3E#1881472b-c959-4259-b574-177feb5e0cda
var eskomSePushAreaData = {
    "events": [
        {
            "end": "2022-09-19T18:30:00+02:00",
            "note": "Stage 6",
            "start": "2022-09-19T14:00:00+02:00"
        },
        {
            "end": "2022-09-20T00:00:00+02:00",
            "note": "Stage 6",
            "start": "2022-09-19T22:00:00+02:00"
        },
        {
            "end": "2022-09-20T08:30:00+02:00",
            "note": "Stage 5",
            "start": "2022-09-20T06:00:00+02:00"
        },
        {
            "end": "2022-09-20T16:30:00+02:00",
            "note": "Stage 5",
            "start": "2022-09-20T14:00:00+02:00"
        },
        {
            "end": "2022-09-21T00:00:00+02:00",
            "note": "Stage 5",
            "start": "2022-09-20T22:00:00+02:00"
        }
    ],
    "info": {
        "name": "Foreways (4)",
        "region": "JHB City Power"
    },
    "schedule": {
        "days": [
            {
                "date": "2022-09-19",
                "name": "Monday",
                "stages": [
                    [
                        "14:00-16:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-10:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ],
                    [
                        "00:00-02:30",
                        "06:00-10:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ],
                    [
                        "00:00-02:30",
                        "06:00-10:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-20",
                "name": "Tuesday",
                "stages": [
                    [
                        "22:00-00:30"
                    ],
                    [
                        "14:00-16:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-16:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-08:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ],
                    [
                        "06:00-10:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ],
                    [
                        "00:00-02:30",
                        "06:00-10:30",
                        "14:00-18:30",
                        "22:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-21",
                "name": "Wednesday",
                "stages": [
                    [],
                    [
                        "20:00-22:30"
                    ],
                    [
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "00:00-02:30",
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "00:00-02:30",
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-00:30"
                    ],
                    [
                        "00:00-02:30",
                        "04:00-06:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ],
                    [
                        "00:00-02:30",
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-22",
                "name": "Thursday",
                "stages": [
                    [
                        "04:00-06:30"
                    ],
                    [
                        "04:00-06:30"
                    ],
                    [
                        "04:00-06:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-14:30",
                        "20:00-00:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-23",
                "name": "Friday",
                "stages": [
                    [
                        "12:00-14:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-16:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-24",
                "name": "Saturday",
                "stages": [
                    [
                        "20:00-22:30"
                    ],
                    [
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-22:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-14:30",
                        "20:00-00:30"
                    ],
                    [
                        "04:00-06:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ],
                    [
                        "04:00-08:30",
                        "12:00-16:30",
                        "20:00-00:30"
                    ]
                ]
            },
            {
                "date": "2022-09-25",
                "name": "Sunday",
                "stages": [
                    [],
                    [
                        "18:00-20:30"
                    ],
                    [
                        "10:00-12:30",
                        "18:00-20:30"
                    ],
                    [
                        "02:00-04:30",
                        "10:00-12:30",
                        "18:00-20:30"
                    ],
                    [
                        "02:00-04:30",
                        "10:00-12:30",
                        "18:00-20:30"
                    ],
                    [
                        "02:00-04:30",
                        "10:00-12:30",
                        "18:00-22:30"
                    ],
                    [
                        "02:00-04:30",
                        "10:00-14:30",
                        "18:00-22:30"
                    ],
                    [
                        "02:00-06:30",
                        "10:00-14:30",
                        "18:00-22:30"
                    ]
                ]
            }
        ],
        "source": "https://www.citypower.co.za/customers/Pages/Load_Shedding_Downloads.aspx"
    }
};

app.get('/', (req, res) => {
    res.send(
      {
        message: "greetings"
      }
    );
});

app.get('/status', (req, res) => {
    res.send(
        eskomSePushStatus
    )
});

app.get('/area', (req, res) => {
    res.send(
        eskomSePushAreaData
    )
});

app.post('/webhook', (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(req)
    res.send(
        {message: "notified"}
    )
});
