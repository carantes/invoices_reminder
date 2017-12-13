import scheduler from '../helpers/scheduler';
import Logger from '../helpers/logger';

function NotificationManager() {
    this.startDate = null;
    this.queue = [];
}

function push(notification) {
    this.queue.push(notification);
}

function getNext() {
    this.queue.sort((a, b) => a.waitTime - b.waitTime);
    return this.queue.shift();
}

function scheduleNotification(notification, onFire) {
    const fireDate = notification.getFireDate(this.startDate);

    scheduler.start(fireDate, onFire);
    Logger.log(`Scheduled notification to ${notification.email} on ${fireDate}`);
}

NotificationManager.prototype.scheduleNotification = scheduleNotification;
NotificationManager.prototype.push = push;
NotificationManager.prototype.getNext = getNext;

export default NotificationManager;
