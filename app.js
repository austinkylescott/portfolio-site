const express = require('express');
const { projects } = require('./data/data.json');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//View engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/projects/:id', (req,res) => {
    const {id} = req.params;
    const project = projects[id];

    if(isNaN(id) || id > projects.length)
        return res.redirect('/');
    else
        res.render('project', {project});
});

//error handlers
app.use((req,res,next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  console.log("Error Status:", err.status, err.message);  
  res.status(err.status || 500);
  res.render('error');
});

app.use((req,res) => res.send('<h1>Express is running on Port 3000</h1>'));
app.listen(3000);