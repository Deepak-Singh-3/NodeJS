const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const home = require('./routes/home');
const courses = require('./routes/courses');


//process.env.NODE_ENV //undefined
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.set('view engine','pug');
app.set('views','./views'); //default, optional setting

app.use(express.json()); //req.body
//adding a piece of middleware
app.use(express.urlencoded({extended : true})); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application name:' + config.get('name'));
console.log('Mail server:' + config.get('mail.host'));
console.log('Mail password:' + config.get('mail.password'));


if(app.get('env') === 'development')
{
        app.use(morgan('tiny'));
        console.log('Morgan Enabled');
}

app.use(logger);


app.use(function(req,res,next) {
    console.log('Authenticating...');
    next();
});


const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}....`))