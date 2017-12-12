import dotenv from 'dotenv';
import Logger from './helpers/logger';
import Reader from './helpers/reader';
import NotificationManager from './models/notificationManager';
import NotificationWorker from './workers/notificationWorker';
import Notification from './models/notification';

dotenv.config();
const { FILENAME } = process.env;

const data = Reader.readFromCSV(FILENAME);
const queue = new NotificationManager();

Logger.log('Reminder app started');

const scheduleNotification = (notification) => {
    queue.scheduleNotification(
        notification,
        () => NotificationWorker.run(notification, scheduleNotification),
        () => Logger.log(`Schedule stopped: ${notification.email}`),
    );
};

data.forEach((row) => {
    const dataRow = row.split(';');
    const email = dataRow[0];
    const message = dataRow[1];
    const schedule = dataRow[2].split('-');
    const notification = new Notification(email, message, schedule);
    queue.push(notification);
});

queue.start(scheduleNotification);

// setInterval(() => Logger.log('Queue is sleeping...'), 5000);
