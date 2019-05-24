//Import filesystem library
const fs = require('fs');
const http = require('http');
const open = require('open');

/**
 * Function to create file with person data
 * @param {Object} data with person data
 */
const createFile = data => {
    let text = `The person ${data.person} with identification number ${data.number},
    has enrolled in the course with ID ${data.id} and name ${data.course},
    which has a duration of ${data.duration} hours and a value of $${data.price}.`;
    fs.writeFile(`${data.id}-${data.course}-${data.person}.txt`, text, (err) =>{
        if (err) throw (err);
        console.log('The file was generated correctly.');
    });
}

/**
 * Function to show person data in the browser
 * @param {Object} data 
 */
const showInTheBrowser = data => {
    let showBrowser = `
    <div style="
        display: flex;
        justify-content: center;
        background: #fff;
        font-size: 18px;
        font-style: italic;
        font-weight: 700;
        color: black;
        align-items: center;
    
    ">
    <div style="
        background-color: #546e7a;
        display: flex;
        align-items: center;
        transition: box-shadow .25s, -webkit-box-shadow .25s;
        border-radius: 10px;
        margin: .5rem 0 1rem 0;
        max-width: 300px;
        max-height: 300px;
    ">
    <div style="
        padding: 24px;
        color: #fff;
        border-radius: 0 0 2px 2px;
    ">
    <span style="
        display: block;
        line-height: 32px;
        margin-bottom: 8px;
        font-size: 24px;
        font-weight: 300;
        color: #fff;
    ">Congratulations!</span>
    <p>
    The person ${data.person} with identification number ${data.number},
    
 has enrolled in the course with ID ${data.id} and name ${data.course},
    
        which has a duration of ${data.duration} hours and a value of $${data.price}.</p>
    </div>
    </div>
    </div>
    `;
    http.createServer(function(req, resp){
        resp.write(showBrowser);
        resp.end();
    }).listen(8080);
    console.log("Server running on port 8080");
    (async () => {
        await open('http://localhost:8080');
    })();
}

module.exports = { createFile, showInTheBrowser }