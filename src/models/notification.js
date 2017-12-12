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
    this.waitTime = schedule;
    this.current = 0;
}

Notification.prototype.getFireDate = function getFireDate(refDate) {
    const nextTime = this.schedule[this.current][0];
    const nextUnit = this.schedule[this.current][1];
    const fireDate = new Date(refDate.clone().add(nextTime, getDateUnit(nextUnit)).format());
    return fireDate;
};

export default Notification;
