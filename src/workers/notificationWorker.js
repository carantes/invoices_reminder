import Logger from '../helpers/logger';
import messageService from '../services/message';

const notificationWorker = () => (
    {
        run(notification, scheduleNext) {
            const { email, message } = notification;
            messageService.send(email, message)
                .then((res) => {
                    const { paid } = res;
                    Logger.log(`Message sent to: ${email} after ${notification.waitTime} and return paid: ${paid} and have ${notification.childs.length} childs`);

                    if ((!paid) && (notification.childs.length > 0)) {
                        const nextNotification = notification.getNextChild();
                        scheduleNext(nextNotification);
                    }
                })
                .catch(error => console.error(error.message));
        },
        onStop() {
            Logger.log('update state');
        },
    }
);

export default notificationWorker();
