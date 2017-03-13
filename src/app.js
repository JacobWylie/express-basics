'use strict';

const express = require('express'),
	posts = require('./mock/posts.json')

const app = express();

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/blog/:title?', (req, res) => {
	let title = req.params.title;
	if (title == undefined) {
		res.status(503);
		res.send("This page is under construction");
	} else {
		let post = posts[title] || {};
		res.render('post', {post: post});		
	}
});

app.listen(3000, () => {
	console.log('The frontend server is running on port 3000');
});