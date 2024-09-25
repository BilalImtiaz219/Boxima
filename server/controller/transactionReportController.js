import TransactionReport from "../models/transactionReport.js";

// Get all transaction reports
export const getTransactionReports = async (req, res) => {
  try {
    const reports = await TransactionReport.find().populate(
      "customer_ID order_ID product_ID payment_ID"
    );
    res.json(reports);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single transaction report
export const getTransactionReportById = async (req, res) => {
  try {
    const report = await TransactionReport.findOne({
      report_ID: req.params.id,
    }).populate("customer_ID order_ID product_ID payment_ID");
    if (!report)
      return res.status(404).json({ message: "Transaction Report not found" });
    res.json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new transaction report
export const createTransactionReport = async (req, res) => {
  const report = new TransactionReport({
    report_ID: req.body.report_ID,
    customer_ID: req.body.customer_ID,
    order_ID: req.body.order_ID,
    product_ID: req.body.product_ID,
    payment_ID: req.body.payment_ID,
    date: req.body.date,
    totalAmount: req.body.totalAmount,
  });
  try {
    const newReport = await report.save();
    res.status(200).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a transaction report
export const updateTransactionReport = async (req, res) => {
  try {
    const updatedReport = await TransactionReport.findOneAndUpdate(
      { report_ID: req.params.id },
      req.body,
      { new: true }
    ).populate("customer_ID order_ID product_ID payment_ID");
    if (!updatedReport)
      return res.status(404).json({ message: "Transaction Report not found" });
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a transaction report
export const deleteTransactionReport = async (req, res) => {
  try {
    const deletedReport = await TransactionReport.findOneAndDelete({
      report_ID: req.params.id,
    });
    if (!deletedReport)
      return res.status(404).json({ message: "Transaction Report not found" });
    res.json({ message: "Transaction Report deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
