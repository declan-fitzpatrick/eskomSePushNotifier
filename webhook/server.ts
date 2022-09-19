import { routes } from './routes';

import express from 'express';
var cors = require('cors');

const app = express();
const port =  8080

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    if ('OPTIONS' == req.method){
        res.sendStatus(200);
    }
    else {
        console.log(`${req.ip} ${req.method} ${req.url}`)
        next();
    }
})

app.use(express.json());
app.use(cors())
app.use('/', routes);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});