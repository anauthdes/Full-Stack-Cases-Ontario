// To run the server with refreshes use 
// npm run start
const express = require('express');
const path = require('path');
const http = require('https');
const app = express();
const port = 3000;
const router = express.router;


var data = {
    resource_id: 'ed270bb8-340b-41f9-a7c6-e8ef587e6d11', // the resource id
    limit: 5, // get 5 results
    // q: 'jones' // query for 'jones'
};

var options = {
    host: 'data.ontario.ca',
    path: '/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&limit=5',
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
    response.on('err', function(e){
    	console.log('fail');
    })
    response.on('end', function() {
        console.log(str);
        app.use('/js', express.static(path.join(__dirname, '/js')))

        app.get('/', (req, res) => {
        	res.send(str);
            res.sendFile(path.join(__dirname + '/index.html'));
        })

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

    });
}

var req = http.request(options, callback);
req.end();