
const Joi = require('joi');
const startupDebugger = require('debug')('app:startup');
//for debugging database related issue
const dbDebugger = require('debug')('app:db');
const config = require('config');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const morgan = require('morgan');
const express = require('express');
const app = express();

//including a templating engine, we are using pug in this tut.
app.set('view engine', 'pug');
app.set('views', './views'); //default 


//express.json() returns a middleware, while app.use uses the middleware in the request pipeline, we cant pass parameters in the post body without doing this in NODE
//body.raw.Json
app.use(express.json());
//for x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
//custom middleware added to request pipeline
app.use(logger);
//router course routes
app.use('/api/courses', courses);

//home route
app.use('/', home);

//Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
//you can get the env password 
// console.log(`Mail Password: ${config.get('mail.password')}`);

app.use(express.static('public'))

//deploying morgan only on development environment 
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled..'); //instead of console.log
}

//E.G: if connection's successfully
dbDebugger('Connected to the database...')





//SERVER CREATION
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


//run the routes in your browser to test, domain should be localhost:`yourport`/`route`/`:routeParam`