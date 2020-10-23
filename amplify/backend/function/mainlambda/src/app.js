/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

  //For invoking APIs from within the lambda function usig HttpRequest with axios library
  //import axios from 'axios';
  var axios = require('axios')
  //Testing with the Star Wars APIs: https://swapi.dev/api/people/



//Latif

app.get('/people', function(req, res) {
  // Instead of hard-coding people, get it from the Star Wars API
  axios.get('https://swapi.dev/api/people').
  then(response => {
    res.json({success: 'get call succeed!', 
    url: req.url,
    people: response.data.results
  });
  }).
  catch(err =>{
    res.json({error: true})
  })
});
  
  //const people = [{name: 'John'}, {name: 'Paul'}];
  //req contains both event and context used in the lambda function
  //req.apiGateway.event; req.apiGateway.context
  //Also, req.body in post events
/*
  Used when the response was hard-coded
  res.json({success: 'get call succeed!', 
            url: req.url,
            people
          });
});
*/

//Another api (authenticated): https://api.coinlore.com/api/tickers
app.get('/coins', function(req, res) {
  // Instead of hard-coding people, get it from the Star Wars API
  axios.get('https://api.coinlore.com/api/tickers').
  then(response => {
    res.json({success: 'get call succeed!', 
    url: req.url,
    coins: response.data.data
  });
  }).
  catch(err =>{
    res.json({error: true})
  })
});




/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
