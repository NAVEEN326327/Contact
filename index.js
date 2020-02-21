const express = require('express');
const path = require('path');
const port = 7001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs'); // setting view engine
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());  // Body parser // Middleware
app.use(express.static('assets'));  // USed for frontend css, images and js files


// // Middleware1
// app.use(function (req, res, next) {
//     req.myName = "Naveen";
//     console.log('middeleware 1 called');
//     next();
// });
// //Middleware2
// app.use(function (req, res, next) {
//     console.log('My name from MW1', req.myName);
//     next();
// })


// var contactList = [ //list
//     {
//         name: "name",
//         roll: "8668"
//     }


// ]

// Home page GET request
app.get('/', function (req, res) { 
    console.log(req.myName);
    // res.send('Cool, it is running! and you are in home page ');
    
    Contact.find({}, (err, contacts)=>{
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "My contact list",
              contact_list: contacts
          });
    });
  
});

// Home page POST request 
app.post('/action_handle', function (req, res) {  // Adding to list

    Contact.create({ // Storing data to database
        // 
       ename: req.body.ename,
       name: req.body.name,
       date1: req.body.date1,
       date2: req.body.date2,
       place: req.body.place,
       mobile: req.body.mobile,
       email: req.body.email
    }, (err, newContact) => {
        if (err) {
            console.log('error in creating a contact!');
            return;
        }
        console.log('*******', newContact);
        return res.redirect('back');

    });
    // console.log(req.body);
    // console.log(req.body.name);

})

//Deleting from list using stack
app.post('/action_delete', function (req, res) {

    contactList.pop({
        ename: req.body.ename,
        name: req.body.name,
        date1: req.body.date1,
        date2: req.body.date2,
        place: req.body.place,
        mobile: req.body.mobile,
        email: req.body.email
    });
    res.redirect('back');


})

// For deleting data from list using roll as unique key on from random index
app.get('/delete-contact/', function (req, res) {
 
    let id = req.query.id;
    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, (err)=>{
            if(err){
          console.log("error in deleting an object from database");
          return;
        }
         res.redirect('back');

        })

})


app.get('/contact', function (req, res) {
    return res.render('contact', {
        title: "Let us play with ejs"
    });
});

app.get('/profile', function (req, res) {
    res.send("welcome to home page");
})

app.listen(port, function (err) {
    if (err) { console.log('error in running the server', err); }

    console.log("Running Yup!!", port);
})