const express = require('express');
const path = require('path');
const port = 7000;

const app = express();

app.set('view engine', 'ejs'); // setting view engine
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());  // Body parser // Middleware
app.use(express.static('assets'));  // USed for frontend css, images and js files


// Middleware1
app.use(function(req,res,next){
    req.myName= "Naveen";
    console.log('middeleware 1 called');
    next();
});
//Middleware2
app.use(function(req,res,next){
    console.log('My name from MW1', req.myName);
    next();
})


var contactList = [ //list
    {
        name: "name",
        roll: "8668"
    }
 

]

    // Home page GET request
app.get('/', function(req, res){
   console.log(req.myName);
    // res.send('Cool, it is running! and you are in home page ');
    return res.render('home', {
        title: "My contact list",
        contact_list : contactList
    });
})

// Home page POST request 
app.post('/action_handle', function(req,res){  // Adding to list

    // return res.render('contact',{
    //     title: "After form submittion"
    // });
    // contactList.push({
    //     name: req.body.name,
    //     roll: req.body.roll
    // });
    contactList.push( req.body );
    res.redirect('./');
    console.log(req.body);
    console.log(req.body.name);

})

//Deleting from list using stack
app.post('/action_delete', function(req,res){ 
    
    contactList.pop({
        name: req.body.name,
        roll: req.body.roll
    });
    res.redirect('./');
   

})

// For deleting data from list using roll as unique key on from random index
app.get('/delete-contact/', function(req,res){
    console.log(req.query);
   let roll = req.query.roll; //getting query from the url
   let contactIndex = contactList.findIndex(contact => contact.roll == roll);
   if(contactIndex != -1)
   {
       contactList.splice(contactIndex,1)
   }
   return res.redirect('back');
})


app.get('/contact', function(req,res){
    return res.render('contact', {
        title: "Let us play with ejs"
    });
});

app.get('/profile', function(req,res){
    res.send("welcome to home page");
})

app.listen(port, function(err){
    if(err){console.log('error in running the server', err);}

    console.log("Running Yup!!", port);
})