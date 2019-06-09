const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//const pool = require('./db');

const app = express();


//Middlewares (Body Parse ya viene integrado en express 4.6.+)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan('dev'));  // OPTION COMBINED 


// Routes
// http://localhost:3000/users-signup-signin-secret
app.use('/api/users', require('./routes/usersRoutes'));

//START SERVER
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('Server on port ' + port);
});