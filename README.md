# EskomSePush Notifier

A simple application that will call to webhooks based on Eskom events. 
Also functions as a local copy of the Eskom Se Push API to not hammer their API. 

## Use cases?

* Integrations into Home-Assistant, but also really anything with a server
* Business Customers who want a notification engine without having to write EskomSePush integrations

## Eskom se push API bugs

```https://developer.sepush.co.za/business/2.0/areas?id=<some id>```

should be area not areas, but the path returns a 500 internal server error.

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

### Webhooks

Fill in the webhooks.ts file with your endpoints and headers
```typescript
export const webhooks : any = {
    actions: [
        {
            endpoint: "http://localhost:8080/webhook",
            headers: {
                'Content-Type': 'application/json',
                'Token': "super secret"
            }
        }
    ],
    warnings: [
        {
            endpoint: "http://localhost:8080/webhook",
            headers: {
                'Content-Type': 'application/json',
                'Token': "super secret"
            }
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