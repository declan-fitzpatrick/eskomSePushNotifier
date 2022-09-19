# EskomSePush Notifier

A simple application that will call to webhooks and publish to mqtt based on Eskom events. 
Also functions as a local copy of the Eskom Se Push API to not hammer their API. 

## Use cases?

* Integrations into Home-Assistant, but also really anything with a server.
* Business Customers who want a notification engine without having to write EskomSePush integrations

## Eskom se push API bugs

```https://developer.sepush.co.za/business/2.0/areas?id=<some id>```

I made a typo in my query, should be `area` not `areas`, returns a 500 internal server error instead of 404. 

## Running the container/program

### Environment variables
The container/program expects a .env file with the format below: 

```
AREA_ID='some area id'
TOKEN='your Eskom Se Push API Token'
STATUS_AREA='eskom' 
```

* `AREA_ID` is from the Eskom Se Push Api [Areas Nearby (GPS)](https://documenter.getpostman.com/view/1296288/UzQuNk3E#4a9eeeb8-87c2-4088-8236-1ed3626e271d) or [Areas Search (Text)](https://documenter.getpostman.com/view/1296288/UzQuNk3E#1986b098-ad88-436c-a5cd-5aa406e2fcf2).
* `TOKEN` is from the Eskom Se Push Team, see the [FAQ](https://developer.sepush.co.za/).
* `STATUS_AREA` is either `eskom` or `capetown`. This may be expanded as more IPP's are brought online. 

### Webhooks and MQTT

Fill in the config.ts file with your configuration
```typescript
export const webhooks : { servers: { url: string, headers: {} }[] } = {
    servers: [
        {
            url: "http://localhost:8080/webhook",
            headers: {
                'Content-Type': 'application/json',
                'Token': "super secret"
            }
        }
    ]
}
export const mqttServer: { servers: { url: string, topic: string, username?: string, password?: string }[] } = {
    servers: [
        {
            url: "http://localhost:8080/mqtt",
            topic: "some topic",
            username: "user",
            password: "super secret"
        }
    ]
}
```
### Building the container image

```shell
docker build -t eskomsepushnotifier:latest .
```

### Running the container

```shell
docker-compose up -d
```