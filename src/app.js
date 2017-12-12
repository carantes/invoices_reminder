import dotenv from 'dotenv';
import moment from 'moment';
import reader from './helpers/reader';
import scheduler from './helpers/scheduler';
import Notification from './models/notification';
import notificationWorker from './workers/notificationWorker';

dotenv.config();
const { FILENAME } = process.env;

const queue = [];
const data = reader.readFromCSV(FILENAME);

data.forEach((row) => {
    const dataRow = row.split(';');
    const email = dataRow[0];
    const message = dataRow[1];
    const schedule = dataRow[2].split('-');
    queue.push(new Notification(email, message, schedule));
});

console.log(queue.length);

// now
const startDate = moment();

queue.forEach((notification) => {
    scheduler.start(
        notification.getFireDate(startDate),
        () => notificationWorker.run(notification),
        () => notificationWorker.onStop(),
    );
});
