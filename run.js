const express = require('express');
const app = express();
const request = require('request');

//templating engine
app.set('view engine','ejs');

app.use('/libs', express.static('libs'));
app.use('/static', express.static('static'));

app.listen(3030, ()=>{
	
	console.log('All is well');
	
});

app.get('/article/:id', (req, res)=>{
	
	var articleId = req.params.id;
	request('http://jsonplaceholder.typicode.com/posts/'+articleId, (err, response, body)=>{
		
		var jsonData = JSON.parse(body);
		
		res.render('article',{ article:jsonData });
		
	});
});

app.get('/', (req, res)=>{
	
	var request = require('request');
	
	var pageNum = req.query.page-1;
	var postCount = 5;
	request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body);
			var jsonData = JSON.parse(body);
			var pageLength = Math.floor(jsonData.length/5);
			var page = jsonData.splice(pageNum*postCount,5);
			
			res.render('landing', {posts	:page,
								   numPages	:pageLength,
								   pageNum	:pageNum
								  
								  });
  }	
});
	
	
	
});