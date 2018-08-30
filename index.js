var express = require("express"),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    Tools = require('./routes/Tools'),
    Roles = require('./routes/Roles'),
    CurrentUser = require('./routes/CurrentUser'),
    Logout = require('./routes/Logout'),
    port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( session({
  secret            : 'super secret key',
  resave            : false,
  saveUninitialized : true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/api/backend/tools', Tools);
app.use('/api/backend/roles', Roles);
app.use('/api/backend/currentuser', CurrentUser);
app.use('/api/backend/logout', Logout);

app.listen(port, function(){
    console.log("Server is running on port " + port);
})
