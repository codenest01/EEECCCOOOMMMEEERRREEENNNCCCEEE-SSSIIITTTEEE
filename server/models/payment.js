const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    payStatus: {
      type: String,
      required: true, // Adjust this based on your needs (e.g., required or optional)
    },
  },
  {
    strict: false, // Allow for additional fields not defined in the schema
  }
);

// Create the model from the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;



// rzp_test_gHH71104gcSjcq
// Og3w1QQcVZ5qr1ZZPSUacAhu