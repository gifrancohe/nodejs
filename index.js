//Import filesystem library
const fs = require('fs');

/**
 * Array with offered courses
 */
let courses = [
    {
        id: '1',
        name: 'Introducción a NodeJS',
        duration: '32',
        price: '0'
    },
    {
        id: '2',
        name: 'Introducción a las Metodologías Agiles',
        duration: '120',
        price: '100'
    },
    {
        id: '3',
        name: 'React Avanzado',
        duration: '250',
        price: '350'
    },
    {
        id: '4',
        name: 'Maching Learning with Python',
        duration: '500',
        price: '700'
    }
];

let createFile = (data) => {
    let text = `El alumno ${data.student} con documento de identificación número ${data.number}
    \n se ha inscrito al curso con ID ${data.id} y nombre ${data.course}
    \n que tiene una duración de ${data.duration} y un valor de ${data.price}.`;
    fs.writeFile(`${data.id}-${data.course}-${data.student}.txt`, text, (err) =>{
        if (err) throw (err);
        console.log('Se ha generado el archivo.');
    });
}
/**
 * Function to search for a course according to an id
 */
let id = '4';
let searchedCourse = courses.find( course => course.id == id );

/**
 * Function to list all course
 */
courses.forEach((course, index) => {
    setTimeout(function(){
        console.log(`Id: ${course.id}, Nombre: ${course.name}, Duración: ${course.duration}, Valor: ${course.price}`);
    }, (2000 * (index + 1)));
});
