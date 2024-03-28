const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use routes module for routing
app.use('/', routes);

app.listen(PORT);
console.log('Server is listening on port ' + PORT + ' ...');