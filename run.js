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
		
		res.render('article',{ article:jsonData, pageName:'article' });
		
	});
});

app.get('/api/posts', (req, res)=>{
	
	var pageNum = req.query.page-1;
	var postCount = req.query.postCount ? req.query.postCount: 5;
	
	
	
	request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body);
			var jsonData = JSON.parse(body);
			var pageLength = Math.floor(jsonData.length / postCount);
			var page = jsonData.splice(pageNum*postCount, postCount);
			
			res.send(page);
		}
			
});
	
});

app.get('/', (req, res)=>{
	
	var request = require('request');
	
	var pageNum = req.query.page-1;
	var postCount = req.query.postCount ? req.query.postCount: 5;
	
	
	
	request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body);
			var jsonData = JSON.parse(body);
			var pageLength = Math.floor(jsonData.length / postCount);
			var page = jsonData.splice(pageNum*postCount, postCount);
			
			res.render('landing', {posts	:page,
								   numPages	:pageLength,
								   pageNum	:pageNum,
								   postCount:postCount,
								   pageName :'articles'
								  
								  });
  }	
});
});
	
app.get('/about', (req, res)=>{
	
	res.render('about',{
						pageName:'about'
		
						});
});

app.get('/portfolio', (req, res)=>{
	
	res.render('portfolio',{
							pageName:'portfolio'
		
							});
	
});