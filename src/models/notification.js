import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    email: String,
    message: String,
    timeZone: String,
    time: { type: Date, index: true },
});

const Invoice = mongoose.model('invoice', InvoiceSchema);
export default Invoice;
