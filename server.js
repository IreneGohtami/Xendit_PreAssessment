const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const conn = require('./db_connection');
const app = express();
const comments = require('./app/routes/comments');
const members = require('./app/routes/members');

conn.connectToServer( function( err, client ) {
	if (err) return console.error(err);
	app.db = conn.getDb();
	if(process.env.NODE_ENV === 'test'){
		app.comCol = app.db.collection('comments_test');
		app.memCol = app.db.collection('members_test');
	}else{
		app.comCol = app.db.collection('comments');
		app.memCol = app.db.collection('members');
	}
	app.config = config;
	console.log('Database connected.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use (function (error, req, res, next){ //catch bodyParser error
	console.log(error);
    next();
});

app.get('/', function(req, res) {
    res.status(200).send('Hi. How can I help you?');
});

/*COMMENTS*/
app.route('/orgs/:orgName/comments')
    .get(comments.getComments)
	.post(comments.postComments)
	.delete(comments.deleteComments);

/*MEMBERS*/
app.route('/orgs/:orgName/members')
    .get(members.getMembers)
	.post(members.postMembers);

app.use(function(req, res, next){
	res.status(400).send('Error: Unknown url or parameters.')
});

app.listen(config.server_port);
//console.log("App listening on port " + config.server_port);

module.exports = app; //for mocha testing