let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin123@cluster0.extet.mongodb.net/mydb',  { useNewUrlParser: true } );
mongoose.set('useFindAndModify', false);
console.log("mongodb connect...")
module.exports=mongoose;
