const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

//declare a db variable, assign to mongoose connection
var db = mongoose.connection;
//db.on will check of connection errors and console the error if occures
db.on('error', console.error.bind(console,'connection error:'));
//db.once will check connection if successfull console log a success message
db.once('open',function(){
  console.log('DB CONNECTED')
});

//repoSchema is
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  user: String,
  url: String,
  repo_id: {type: Number,unique: true},
  views: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArr, callback) => {
  //console.log(repoArr);
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repos =[];
  repoArr.forEach((repo)=>{

    var dbRepo = new Repo();
    dbRepo.name = repo.name;
    dbRepo.user = repo.owner.login;
    dbRepo.url = repo.html_url;
    dbRepo.repo_id = repo.id;
    dbRepo.views = repo.watchers_count;
    repos.push(dbRepo);

  })

  Repo.insertMany(repos)
    .then((data)=>{
      callback(null,data)
    })
    .catch((err)=>{
      callback(err,null)
    })

}

let topSaves = (callback)=>{
  Repo.find({})
    .sort({views:'descending'})
    .limit(25)
    .exec((err,data)=>{
      if(err){
        callback(err,null)
      }else{
        callback(null,data)
      }
    })
}

module.exports.save = save;
module.exports.topSaves = topSaves;