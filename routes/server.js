var express = require('express');
var router = express.Router();
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
//var fs = require("fs");

app.get('/', function (req, res) {
   //fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      //console.log( data );
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json('Backend server');

   });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mysql=require('mysql');
var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"crudapp"
});

app.post('/register', function(req, res){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   let data = {
      fullname:req.body.fullname,
      email:req.body.email,
      password:req.body.password
   };
   con.query("insert into users (fullname, email, password) values('"+ req.body.fullname +"', '"+ req.body.email +"', '"+ req.body.password +"')");
   // if(err) throw err;
   console.log("inserted");
});

app.post('/login', function(req,res){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   var email = req.body.email;
   var password = req.body.password;
   con.query("select * from users where email=?", [email],  function(error,results,fields){
      if(results.length > 0){
         // console.log("logged In");
         res.send('display.js');
      }
      else{
         console.log("wrong details");
      }
     
      });    
 });

app.post('/add', function(req,res){
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   let newsAdd={
      title:req.body.title,
      description : req.body.desccription,
      type : req.body.type
   };
con.query("insert into news (title, description, type) values('"+ req.body.title +"', '"+ req.body.description +"', '"+ req.body.type +"')");
   
});

app.get('/display', function(req,res){
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   let data ={
      title:req.body.title,
      description : req.body.desccription,
      type : req.body.type
   }
   con.query("select * from news order by id desc", function(error, results, fields){
      // if(error) throw error;
      // res.end(JSON.stringfy(results));
      if(error) console.log(error);
      else{
      
         res.send(results);
      }
      // res.json(results);
      // console.log("Successss");
   });
});

app.post('/edit/:id', function(req, res, next){
   let data ={
      title:req.body.title,
      description:req.body.desccription,
      type:req.body.type,
      id:req.body.id
   }
   console.log(data);
   con.query("update news set title='"+ req.body.title +"', description='"+ req.body.description +"', type='"+ req.body.type +"' where id = '"+ req.body.id +"' ", 
      function(error,results,fields){
         if(error) console.log(error);
         else{
         console.log("edited");
         } 
      });
   
})
app.delete('/delete/:id', function(req, res, next){
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
let data ={
      title:req.body.title,
      description:req.body.desccription,
      type:req.body.type,
      id:req.body.id
   }
   console.log(data); // idhar pe id nahi mil rha hai
   con.query("delete from news where id='"+ req.body.id +"'", 
      function(error,results,fields){
         if(error) console.log(error);
         else{
            //res.send(results);
            console.log("deleted");
         }
      });
})

app.use(cors()) ;

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = router;