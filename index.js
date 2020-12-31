// To run the server with refreshes use 
// npm run start
const express = require('express');
const path = require('path');
const http = require('https');
const fs = require('fs');
const app = express();
const port = 3000;
const router = express.router;
var curdate = new Date();
var dateoffset = 1;

var data = {
    resource_id: 'ed270bb8-340b-41f9-a7c6-e8ef587e6d11', // the resource id
    limit: 5, // get 5 results
    // q: 'jones' // query for 'jones'
};

var options = {
    host: 'data.ontario.ca',
    path: '/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&q=' + curdate.getFullYear() + '-' + addLeadingZero(curdate.getMonth()+1) + '-' + addLeadingZero(curdate.getDate() - dateoffset),
    dataType: 'jsonp',
    //port: port,
    //This is the only line that is new. `headers` is an object with the headers to request
    // headers: {'custom': 'Custom Header Demo works'}
};

callback = function(response) {
    var str = ''
    response.on('data', function(chunk) {
        str += chunk;
    });
    response.on('err', function(e) {
        console.log('fail');
    })
    response.on('end', function() {
        //console.log(str);
        fs.writeFile(path.join(__dirname,"/js/temp/data.txt"), str, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved to ", path.join(__dirname,"/js/temp"));
        });

        app.use('/js', express.static(path.join(__dirname, '/node_modules/angular')));
        app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
        app.use('/js', express.static(path.join(__dirname, '/js')));
        app.use('/temp', express.static(path.join(__dirname,"/js/temp")));

        app.get('/', (req, res) => {
            //res.send(str);
            res.sendFile(path.join(__dirname + '/index.html'));
        })

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

    });
}

var req = http.request(options, callback);
req.end();

function addLeadingZero(num){
    if(Math.abs(num) < 10){
        return "0" + Math.abs(num).toString;
    }
    return num;
}