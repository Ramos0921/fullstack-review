const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');





let getReposByUsername = (username,callback) => {
  var url = 'https://api.github.com/users/'+username+'/repos';


  axios({
    method: 'get',
    url:url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
      }
  })
    .then((data)=>{
      callback(null,data)
    })

    .catch((err)=>{

      callback(err,null)
    });
}

module.exports.getReposByUsername = getReposByUsername;