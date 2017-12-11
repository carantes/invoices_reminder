import messageService from '../services/message';

const notificationWorker = () => (
    {
        run(data) {
            const { email, message } = data;
            messageService.send(email, message)
                .then(res => res.json())
                .then((res) => {
                    const { paid } = res;
                    console.log('message sent ', email, message, paid);
                });
        },
    }
);

export default notificationWorker();
