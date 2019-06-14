const fs = require('fs');

listOfCourses = [];

const create = (course) => {
    let cour = {
        id: course.id,
        name: course.name,
        description: course.description,
        price: course.price,
        modality: course.modality ? course.modality : "",
        intensity: course.intensity ? course.intensity : ""
    };
    let duplicatecourse = listOfCourses.find(cou => cou.id == course.id);
    if(!duplicatecourse) {
        listOfCourses.push(cour);
        save();
        return {code: true, message: "Course created succesfully!!"};
    }else{
        return {code: false, message: "There is already a course with that id"};
    }
};

const save = () => {
    let data = JSON.stringify(listOfCourses);
    fs.writeFile('listOfCourse.json', data, (err) =>{
        if(err) throw (err);
        console.log('Success create file!!');
    })
}

module.exports = {
    create,
};