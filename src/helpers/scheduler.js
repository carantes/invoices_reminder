import { CronJob } from 'cron';

const schedulerFactory = () => (
    {
        start(cronTime, onTick) {
            return new CronJob(
                cronTime,
                onTick,
                null,
                true,
                '',
            );
        },
    }
);

export default schedulerFactory();
