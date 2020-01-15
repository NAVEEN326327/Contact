//  Require the library
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');
 
// Aquire the connection ( to check if it is successful)
const db = mongoose.connection;

// Error handle
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', ()=> console.log("Successfully connected to the database"));