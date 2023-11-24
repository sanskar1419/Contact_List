const mongoose = require("mongoose"); //Note : It will use the same instance which was created with mongoose.js

// We will now create an schema in the database
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Name of Contact list collection in DB

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
