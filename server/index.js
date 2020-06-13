const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors= require('cors');
const userRepo = require('../database/index.js');
const getUserGit = require('../helpers/github.js')
const db = require('../database/index.js');
var Promise = require('bluebird')
Promise.promisifyAll(require('mongoose'))

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.post('/repos', function (req, res) {

  getUserGit.getReposByUsername(req.body.username,(err,response)=>{
    if(err){
      res.send(err);
    }else{
      db.save(response.data,(err,data)=>{
        if(err){
          res.send(err);
        }
        else{
          res.json(data);
        }
      })
    }
  })
});




app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.topSaves((err,data)=>{
    if(err){
      res.send(err);
    }
    else{
      res.json(data)
    }
  })

});

let port = process.env.PORT||1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

