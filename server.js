const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('mongodb').MongoClient;
// const bcrypt = require('bcrypt');
const config = require('./config');
const app = express();
const pkg = require('./package.json');
// const db;

// const dbURL = (config.use_local_db==1 ? config.local_db_url : config.remote_db_url);
// mongodb.connect(dbURL, {useNewUrlParser: true}, function(err, client) {
// 	if (err) throw err;
// 	db = client.db(config.db_name);

// 	console.log('Database connected.');
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use (function (error, req, res, next){ //catch bodyParser error
	console.log(error);
    next();
});

app.get('/', function(req, res) {
    res.status(200).send('Hellooo. Anyone there? ' + pkg.version);
})

/*COMMENTS*/
// .get('/orgs/:orgName/comments', function(req, res) {
// 	var objCol = db.collection('comments');
// 	var query = { $and: [{org_name: req.params.orgName.toLowerCase()}, {status:1}] };
//
// 	objCol.find(query, {projection:{ _id: 0, org_name: 0, status: 0 }}).toArray(function(err, result) {
// 		if(err) throw err; //console.log(result);
// 		if(result.length > 0){
// 			res.status(200).send(result);
// 		}
// 		else{
// 			res.status(200).send('No comments found for '+req.params.orgName+'.');
// 		}
// 	});
// })
// .post('/orgs/:orgName/comments', function(req, res) {
// 	var contentType = req.headers['content-type'];
// 	if(contentType != "application/json"){
// 		res.status(412).send('Error: Content-Type in request header must be "application/json".');
// 	}
// 	var comment = req.body.comment;
// 	if(comment){
// 		var objCol = db.collection('comments');
// 		var document = { org_name: req.params.orgName.toLowerCase(), comment: comment, status:1 };
// 		objCol.insertOne(document, function(err, res2) {
// 			if(err) throw err;
// 			console.log("Comment inserted.");
// 			res.status(200).send('Comment: "' + comment + '" for ' + req.params.orgName + ' has been saved.');
// 		});
// 	}
// 	else{
// 		res.status(200).send('Error: Please pass a "comment" in a valid JSON format in the request body. Example: {"comment":"This is a comment"}');
// 	}
// })
// .delete('/orgs/:orgName/comments', function(req, res) {
// 	var objCol = db.collection('comments');
// 	var filter = { org_name: req.params.orgName.toLowerCase() };
// 	var document = { $set: { status:0 } };
//
// 	objCol.updateMany(filter, document, function(err, res2) {
// 		if(err) throw err;
// 		console.log("Comment deleted.");
// 		res.status(200).send("All comments on " + req.params.orgName + " have been deleted.");
// 	});
// })
//
// /*MEMBERS*/
// .get('/orgs/:orgName/members', function(req, res) {
// 	var objCol = db.collection('members');
// 	var query = { org_name: req.params.orgName.toLowerCase() };
// 	var sort = { no_followers: -1 };
//
// 	objCol.find(query, {projection:{ _id: 0, org_name: 0 }}).sort(sort).toArray(function(err, result) {
// 		if(err) throw err; //console.log(result);
// 		if(result.length > 0){
// 			res.status(200).send(result);
// 		}
// 		else{
// 			res.status(200).send('No members found for '+req.params.orgName+'.');
// 		}
// 	});
// })
// .post('/orgs/:orgName/members', function(req, res) { //to add sample data to members
// 	var contentType = req.headers['content-type'];
// 	if(contentType != "application/json"){
// 		res.status(412).send('Error: Content-Type in request header must be "application/json".');
// 	}
// 	var objCol = db.collection('members');
// 	var data = req.body;
// 	if(data.username && data.email && data.password && data.avatar && data.no_followers && data.following_no){
// 		bcrypt.genSalt(config.salt_factor, function(err, salt) {
// 			if(err) return next(err);
// 			bcrypt.hash(data.password, salt, function(err, hash) {
// 				if(err) return next(err);
// 				var encPass = hash;
// 				var document = {
// 					org_name: 		req.params.orgName.toLowerCase(),
// 					username: 		data.username, 
// 					email: 			data.email,
// 					password: 		encPass,
// 					avatar: 		data.avatar,
// 					no_followers: 	data.no_followers,
// 					following_no: 	data.following_no
// 				};
//
// 				objCol.insertOne(document, function(err, res2) {
// 					if(err) throw err;
// 					console.log("Member inserted.");
// 					res.status(201).send('Member: "' + data.username + '" for ' + req.params.orgName + ' has been saved.');
// 				});
// 			});
// 		});
// 	}else{
// 		res.status(200).send('Error: Invalid JSON format in the request body.');
// 	}
// });
//
// app.use(function(req, res, next){
// 	res.status(400).send('Error: Unknown url or parameters.')
// });
//
app.listen(config.server_port);
//console.log("App listening on port " + config.server_port);


process.on('uncaughtException', (err) => {
	console.error('EXECPTION::', err)
  });
  