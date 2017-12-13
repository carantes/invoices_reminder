import Notification from './notification';

describe('Notification', () => {
    let notification;

    beforeEach(() => {
        const email = 'carantes.ferreira@gmail.com';
        const message = 'bar foo';
        const schedule = ['2s', '4s', '6s'];
        notification = new Notification(email, message, schedule);
    });

    test('Notification is a instance of an object', () => {
        expect(typeof notification).toBe('object');
    });

    test('Wait time should be a number', () => {
        expect(notification.waitTime).toEqual(2);
    });

    test('getFireDate should return new date two seconds after', () => {
        const refDate = new Date('2017-12-13T00:46:52.932Z');
        expect(notification.getFireDate(refDate)).toEqual(new Date('2017-12-13T00:46:54.932Z'));
    });

    test('getNextChild should return new Notification Object', () => {
        const newNotification = notification.getNextChild();
        expect(typeof newNotification).toBe('object');
        expect(newNotification.waitTime).toEqual(4);
    });
});
