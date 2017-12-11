// import dotenv from 'dotenv';
import moment from 'moment';
// import server from './helpers/server';
import scheduler from './helpers/scheduler';
import notificationWorker from './workers/notificationWorker';
import { customers } from './sample.json';

// dotenv.config();
// const { CRONTIME } = process.env;

const startDate = moment();

console.log('Start Date', startDate.format('h:mm:ss a'));

customers.forEach((customer) => {
    customer.schedule.forEach((nextDate) => {
        const fireDate = new Date(startDate.clone().add(nextDate, 'seconds').format());
        scheduler.start(fireDate, () => notificationWorker.run(customer));
    });
});
