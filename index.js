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
/**
 * Function to search for a course according to an id
 */
let id = '4';
let searchedCourse = courses.find( course => course.id == id );
console.log(searchedCourse);