var express = require("express"),
    sslRedirect = require('heroku-ssl-redirect'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    Tools = require('./routes/Tools'),
    Roles = require('./routes/Roles'),
    CurrentUser = require('./routes/CurrentUser'),
    Logout = require('./routes/Logout'),
    Authentication = require('./middleware/Authentication'),
    config = require('./middleware/config'),
    cas = Authentication.getInstance(config),
    path = require("path"),
    port = process.env.PORT || 5000;


app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( session({
  secret            : 'super secret key',
  resave            : false,
  saveUninitialized : true
}));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', cas.bounce,  (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));


app.use('/api/backend/tools', Tools);
app.use('/api/backend/roles', Roles);
app.use('/api/backend/currentuser', CurrentUser);
app.use('/api/backend/logout', Logout);

app.listen(port, function(){
    console.log("Server is running on port " + port);
})
