// Below two line are needed to setup up moongoose db
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contact_list_db"); //this is how mongoose will connect to our database

// db is the connection mongoose and database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting to DB"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});
