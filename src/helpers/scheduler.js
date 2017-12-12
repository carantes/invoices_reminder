import { CronJob } from 'cron';

const schedulerFactory = () => (
    {
        start(cronTime, onTick, onComplete) {
            return new CronJob(
                cronTime,
                onTick,
                onComplete,
                true,
                '',
            );
        },
    }
);

export default schedulerFactory();
