const express = require("express");
const { request } = require("https");
const port = 8000;
const path = require("path"); // We are including path module in the path variable.

// Firing the mongoose
const db = require("./config/mongoose");
const Contact = require("./models/Contact"); //now this Contact is going to used to populate the contactlist
const app = express();

app.set("view engine", "ejs"); //We need tell express that we using ejs as a template engine
// As we know app is object and contain to many key value property. As we write app.set , it is setting the value of key named view engine as ejs.

// Now we need to set the path  and tell wher are we going to place views

app.set("views", path.join(__dirname, "views"));
// Here __dirname store the current path of the project we are working on
// It's make the path dynamic so that whoever is using it it will change with respect to there location of folder.
app.use(express.urlencoded());
// Middleware for Static File
app.use(express.static("assets")); //we need to specify the name of the folder in directory

// Creating our first Middleware

// app.use(function (req, res, next) {
//   req.my_name = "Sanskar";
//   // console.log("Middleware 1 has run", req.my_name);
//   next();
// });

// app.use(function (req, res, next) {
//   // console.log("Middleware 2 has run", req.my_name);
//   next();
// });
// // Note we can also manipulate with the data in middleware

var contactList = [
  {
    name: "Sanskar",
    phoneNo: "8259990668",
  },
  {
    name: "Baishali",
    phoneNo: "9862321039",
  },
  {
    name: "Father",
    phoneNo: "8787700713",
  },
];

//Previous way without db
/*

app.get("/", function (req, res) {
  // console.log("Home has run", req.my_name);
  return res.render("home", {
    title: "Sanskar is alive",
    contact_list: contactList,
  }); //if this is the last statement of the response then this case we need to return it to send response
  // res.send("<h1>Server is running fine</h1>");
});

*/
/*
//With data base
app.get("/", function (req, res) {
  // console.log("Home has run", req.my_name);

  // First we will fetch the data
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error is fetching contact : ", err);
      return;
    }
    return res.render("home", {
      title: "Sanskar is alive",
      contact_list: contacts,
    });
  });
});
*/

app.get("/", async function (req, res) {
  try {
    const contacts = await Contact.find({});
    return res.render("home", {
      title: "Sanskar is alive",
      contact_list: contacts,
    });
  } catch (err) {
    console.log("Error is fetching contact : ", err);
    return;
  }
});

// Handeling data that will be shown in practice url
app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "let us play with ejs",
  });
});

/*
app.post("/create-post", function (req, res) {
  // console.log(req);
  // return res.redirect("/practice");
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phoneNo);

  // Without use of database
  // contactList.push({
  //   name: req.body.name,
  //   phoneNo: req.body.phoneNo,
  // });

  // contactList.push(req.body);

  // With use of database
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.name,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("******", newContact);
      return res.redirect("back");
    }
  );
});
*/

//Handeling data that we get from from the form
app.post("/create-post", async function (req, res) {
  try {
    // Create a new contact using the Contact model
    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phoneNo, // Assuming 'phoneNo' is the correct field name
    });

    console.log("******", newContact);

    // Redirect after successfully creating a contact
    return res.redirect("back");
  } catch (err) {
    console.error("Error in creating a contact:", err);
    // Handle the error appropriately (e.g., sending an error response)
    res.status(500).send("Error in creating a contact");
  }
});

//params way
// app.get("/delete-contact/:phone", function (req, res) {
//   console.log(req.params);
//   let phone = req.params.phone;
// });

/*
app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex(
    (contact) => contact.phoneNo == phone
  );

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }

  return res.redirect("/");
});

*/

app.get("/delete-contact/", async function (req, res) {
  try {
    // get the id from query in the url
    console.log(req.query);
    let id = req.query.id;
    // find the contact in the database using id and delete it
    await Contact.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    console.error("Error in deletng the contact:", err);
    // Handle the error appropriately (e.g., sending an error response)
    res.status(500).send("Error in deletng the contact");
  }
});

//Staring the Server
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Server is running with full pace", port);
});
