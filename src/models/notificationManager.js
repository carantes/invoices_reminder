import moment from 'moment';
import scheduler from '../helpers/scheduler';
import Logger from '../helpers/logger';

function NotificationManager() {
    this.startDate = moment();
    this.queue = [];
}

function push(notification) {
    this.queue.push(notification);
}

function start(cb) {
    this.queue.sort((a, b) => a.waitTime - b.waitTime);
    this.startDate = moment();

    this.queue.forEach((notification) => {
        cb(notification);
    });
}

function scheduleNotification(notification, onFire, onComplete) {
    let fireDate = notification.getFireDate(this.startDate);
    const now = moment();

    // delayed messages
    if (moment(fireDate).isBefore(now)) {
        Logger.log(`Message to ${notification.email} is delayed`);
        fireDate = new Date();
    }

    scheduler.start(fireDate, onFire, onComplete);
    Logger.log(`Scheduled notification to ${notification.email} on ${fireDate}`);
}

NotificationManager.prototype.scheduleNotification = scheduleNotification;
NotificationManager.prototype.push = push;
NotificationManager.prototype.start = start;

export default NotificationManager;
