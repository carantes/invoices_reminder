import dotenv from 'dotenv';
import Logger from './helpers/logger';
import Reader from './helpers/reader';
import NotificationWorker from './workers/notificationWorker';
import NotificationManager from './models/notificationManager';
import Notification from './models/notification';

dotenv.config();
const { FILENAME } = process.env;

const data = Reader.readFromCSV(FILENAME);
const queue = new NotificationManager();

Logger.log('Reminder app started');

const parseDataToNotification = (row) => {
    const dataRow = row.split(';');
    const email = dataRow[0];
    const message = dataRow[1];
    const schedule = dataRow[2].split('-');
    return new Notification(email, message, schedule);
};

const scheduleNotification = (notification) => {
    queue.scheduleNotification(
        notification,
        () => NotificationWorker.run(notification, scheduleNotification),
        () => Logger.log(`Schedule stopped: ${notification.email}`),
    );
};

// Build notification queue
data.forEach((row) => {
    queue.push(parseDataToNotification(row));
});

// First notification always is fired on time zero
const firstNotification = queue.getNext();
queue.startDate = new Date();

NotificationWorker.run(firstNotification, scheduleNotification)
    .then(() => {
        let next = queue.getNext(); // Next user

        while (next) {
            scheduleNotification(next);
            next = queue.getNext();
        }
    });
