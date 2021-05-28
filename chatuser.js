let mongoose=require('./mongoose');
let schemaChatUser=new mongoose.Schema({
    username:{
    type:String,
    require:true,
    unique:true
    },
    password:{
    type:String,
    require:true,
    }
    })
let ChatUser=mongoose.model("ChatUser",schemaChatUser);
module.exports=ChatUser;

module.exports.getUserByUsername = function(username, callback){
  let query = {username: username};
    User.findOne(query, callback);
  }
  
  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
    });
  }
  
