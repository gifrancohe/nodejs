const hbs = require('hbs');

hbs.registerHelper('tableOfCourses', () => {
    listOfCourses = require('../../listOfCourses.json');
    let table = "";
    listOfCourses.forEach(course => {
        table += `
        <tr>
            <th scope="row">${course.id}</th>
            <td>${course.name}</td>
            <td>${course.description}</td>
            <td>${course.price}</td>
            <td>${course.modality}</td>
            <td>${course.intensity}</td>
        </tr>`
    });
    return table;
});