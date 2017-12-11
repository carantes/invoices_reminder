import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';

const server = express();

server.get('/', (req, res) => res.send('Invoices Reminder running...'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.locals.moment = moment;

export default server;
