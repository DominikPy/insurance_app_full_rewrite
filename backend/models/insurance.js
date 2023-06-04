const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  amount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Insurance', insuranceSchema)