function Notification(email, message, schedule) {
    this.email = email;
    this.message = message;
    const nextTime = schedule.shift();
    this.waitTime = parseInt(nextTime.substring(0, nextTime.length - 1), 10);
    this.childs = schedule;
    this.currentChild = 0;
}

function getFireDate(refDate) {
    const fireDate = new Date(refDate.getTime() + (this.waitTime * 1000));
    return fireDate;
}

function getNextChild() {
    this.currentChild = this.currentChild + 1;
    return new Notification(this.email, this.message, this.childs);
}

Notification.prototype.getFireDate = getFireDate;
Notification.prototype.getNextChild = getNextChild;

export default Notification;
