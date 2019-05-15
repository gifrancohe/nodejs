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
    let text = `The person ${data.person} with identification number ${data.number},
    \n has enrolled in the course with ID ${data.id} and name ${data.course},
    \n which has a duration of ${data.duration} hours and a value of $${data.price}.`;
    console.log(text);
    fs.writeFile(`${data.id}-${data.course}-${data.person}.txt`, text, (err) =>{
        if (err) throw (err);
        console.log('The file was generated correctly.');
    });
}

const options = {
    id: {
        demand: true,
        alias: 'i'
    },
    name: {
        demand: true,
        alias: 'n'
    },
    document: {
        demand: true,
        alias: 'd'
    }
};

const argv = require('yargs')
.command('inscribir', '============== Start of the registration process ==============', options)
.argv



/**
 * Function to search for a course according to an id
 */
let courseId = argv.id; 
if(courseId) {
    console.log("Searching the course ...");
    let searchedCourse = courses.find( course => course.id == courseId );
    if(searchedCourse === undefined) {
        console.log("Alert: The identifier entered does not correspond with any of our courses.");
        console.log("============== List of Courses ==============");
        courses.forEach((course, index) => {
            console.log(`ID: ${course.id}, Name: ${course.name}, Duration: ${course.duration}, Price: ${course.price}`);
        });
    }else {
        let data = {
            person: argv.name,
            number: argv.document,
            id: searchedCourse.id,
            course: searchedCourse.name,
            duration: searchedCourse.duration,
            price: searchedCourse.price
        };
        createFile(data);
        console.log("¡Congratulations you have enrolled in the course correctly!");
    }
}else {
    /**
     * Function to list all course
     */
    courses.forEach((course, index) => {
        setTimeout(function(){
            console.log(`ID: ${course.id}, Name: ${course.name}, Duration: ${course.duration}, Price: ${course.price}`);
        }, (2000 * (index + 1)));
    });
}