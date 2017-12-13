# InvoicesReminder

Sample scheduler app to Read customer data from a CSV file and sends out reminders of unsettled invoices based on the specified schedule.
*  This app is not production ready but try to follow some engineering best practices
*  Some arquitecture tradeoffs (number of users/queue x retries per user, schedule notifications on the fly or cancel subsequent notifications)
*  If it was a real life scheduler app would be necessary implement a queue state persistency, because if the app crash the progress will be lost.

### Requirements

* NodeJS

### Installing

```
npm install
```

### Running

```
npm start
```

## Tests and code lint

```
npm run check 
```

## Authors

* **Carlos Eduardo Arantes Ferreira**
*Technology Lead* - [Github] (https://github.com/carantes)
