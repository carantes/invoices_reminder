import invoice from '../models/invoice';

const invoiceReminderWorker = () => (
    {
        run() {
            console.log('Running worker');
        },
    }
);

export default invoiceReminderWorker();
