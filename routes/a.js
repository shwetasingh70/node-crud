app.post('/', (req,res) => {
	var data = {fullname: req.body.fullname, email:req.body.fullname, 
				password:req.body.password};
	var sql = "INSERT INTO users SET ?";
	var query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });

});

''+req.body.fullname+'',''+req.body.email+'', ''+req.body.password''