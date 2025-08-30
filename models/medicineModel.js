const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;