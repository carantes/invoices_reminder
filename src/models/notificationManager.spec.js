import NotificationManager from './notificationManager';

describe('Notification Manager', () => {
    let manager;

    beforeEach(() => {
        manager = new NotificationManager();
    });

    test('Notification Manager is a instance of an object', () => {
        expect(typeof manager).toBe('object');
    });

    test('Queue must be empty', () => {
        expect(manager.queue.length).toBe(0);
    });

    test('Call Push function must increase queue length', () => {
        manager.push({});
        expect(manager.queue.length).toBe(1);
    });

    test('Call GetNext function must decrease queue length and return an object', () => {
        manager.push({});
        manager.push({});
        expect(manager.queue.length).toBe(2);
        const next = manager.getNext();
        expect(manager.queue.length).toBe(1);
        expect(typeof next).toBe('object');
    });
});
