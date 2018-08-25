var express = require("express"),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    Tools = require('./routes/Tools'),
    Roles = require('./routes/Roles'),
    CurrentUser = require('./routes/CurrentUser'),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( session({
  secret            : 'super secret key',
  resave            : false,
  saveUninitialized : true
}));

app.use('/api/backend/tools', Tools);
app.use('/api/backend/roles', Roles);
app.use('/api/backend/currentuser', CurrentUser);

app.listen(port, function(){
    console.log("Server is running on port " + port);
})
