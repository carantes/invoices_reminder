import dotenv from 'dotenv';
import server from './helpers/server';
import scheduler from './helpers/scheduler';
import invoiceReminder from './workers/invoiceReminder';

dotenv.config();
const { CRONTIME, PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) //eslint-disable-line
});

scheduler.start(CRONTIME, () => invoiceReminder.run());
