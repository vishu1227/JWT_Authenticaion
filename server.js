const { static } = require('express');
const express = require('express');
const passport = require('passport');
const route = require('./routes/routes');
const bodyParser=require('body-parser');

const app = express();

//it's for all the passport based authentication
require('./auth/auth')

const routes=require('./routes/routes')
const secureRoute=require('./routes/secure-routes')

app.use('/',routes)

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.listen(3000, () => {
    console.log('Server is live! at localhost:3000')
})
