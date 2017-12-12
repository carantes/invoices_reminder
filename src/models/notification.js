const getDateUnit = (unit) => {
    switch (unit) {
        default:
        case 's':
            return 'seconds';
        case 'm':
            return 'minutes';
        case 'h':
            return 'hours';
    }
};

function Notification(email, message, schedule) {
    this.email = email;
    this.message = message;
    const nextTime = schedule.shift();
    this.waitTime = parseInt(nextTime.substring(0, nextTime.length - 1), 10);
    this.childs = schedule;
    this.currentChild = 0;
}

function getFireDate(refDate) {
    // const nextTime = this.waitTime.substring(0, this.waitTime.length - 1);
    // const nextUnit = this.waitTime.substring(this.waitTime.length - 1, 1);
    const fireDate = new Date(refDate.clone().add(this.waitTime, 'seconds').format());
    return fireDate;
}

function getNextChild() {
    this.currentChild = this.currentChild + 1;
    return new Notification(this.email, this.message, this.childs);
}

Notification.prototype.getFireDate = getFireDate;
Notification.prototype.getNextChild = getNextChild;

export default Notification;
