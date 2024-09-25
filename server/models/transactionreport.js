import mongoose from 'mongoose';
const transactionReportSchema = mongoose.Schema;

const transactionReport = new transactionReportSchema({
    report_ID: { type: Number, required: true, unique: true },
    customer_ID: { type: Number, ref: 'Customer', required: true },
    order_ID: { type: Number, ref: 'ShoppingOrder', required: true },
    product_ID: { type: Number, ref: 'Product', required: true },
    payment_ID: { type: Number, ref: 'Payment', required: true }
});

const TransactionReport = mongoose.model('TransactionReport', transactionReport);
export default TransactionReport;