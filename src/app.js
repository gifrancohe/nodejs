const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParse = require('body-parser');
const listOfCourse = require('../listOfCourse.json');

const dirPublico = path.join(__dirname, '../public');
const dirNode_modules = path.join(__dirname, '../node_modules');
const dirPartials = path.join(__dirname, '../partials');

app.use(express.static(dirPublico));
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.use(bodyParse.urlencoded({extended: true}));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

hbs.registerPartials(dirPartials);

app.get('/', (req, res) => {
    res.render('index',{
        name: 'Giovanny',
        lastname: 'Franco'
    });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const courseController = require('./controllers/courseController');
    let course = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        modality: req.body.modality ? req.body.modality : "",
        intensity: req.body.intensity ? req.body.intensity : "",
    };
    let response = courseController.create(course);
    res.render('courses', {
        response: response
    });
});

app.listen(3000, () => {
    console.log('Escuchando por el puerto 3000');
});