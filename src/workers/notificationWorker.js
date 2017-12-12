import messageService from '../services/message';

const notificationWorker = () => (
    {
        run(customer) {
            const { email, message } = customer;
            messageService.send(email, message)
                .then((res) => {
                    const { paid } = res;
                    console.log('message sent ', email, message, paid);
                })
                .catch(error => console.error(error.message));
        },
        onStop() {
            console.log('update state');
        },
    }
);

export default notificationWorker();
