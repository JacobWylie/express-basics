'use strict';

const express = require('express'),
	posts = require('./mock/posts.json');

const postList = Object.keys(posts).map( value => posts[value] );

const app = express();

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
	let path = req.path;
	res.locals.path = path;
	res.render('index');
});

app.get('/blog/:title?', (req, res) => {
	let title = req.params.title;
	if (title == undefined) {
		res.status(503);
		res.render('blog', {posts: postList});
	} else {
		let post = posts[title] || {};
		res.render('post', {post: post});		
	}
});

app.listen(3000, () => {
	console.log('The frontend server is running on port 3000');
});