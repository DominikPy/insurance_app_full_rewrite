const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },

  last_name: {
    type: String,
    require: true,
  },

  age: {
    type: Number,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },

  insurance: {
    type: Array,
    require: false,
  },
});

module.exports = mongoose.model("Clients", clientSchema);
