const bcrypt = require('bcrypt');

function getMembers(req, res) {
    var objCol = req.app.memCol;
	var query = { org_name: req.params.orgName.toLowerCase() };
	var sort = { no_followers: -1 };

	objCol.find(query, {projection:{ _id: 0, org_name: 0 }}).sort(sort).toArray(function(err, result) {
		if(err) throw err;
		if(result.length > 0){
			res.status(200).send(result);
		}
		else{
			res.status(200).send('No members found for '+req.params.orgName+'.');
		}
	});
}

function postMembers(req, res) {
    var contentType = req.headers['content-type'];
	if(contentType != "application/json"){
		res.status(412).send('Error: Content-Type in request header must be "application/json".');
	}
	var objCol = req.app.memCol;
	var data = req.body;
	if(data.username && data.email && data.password && data.avatar && data.no_followers && data.following_no){
		bcrypt.genSalt(req.app.config.salt_factor, function(err, salt) {
			if(err) return next(err);
			bcrypt.hash(data.password, salt, function(err, hash) {
				if(err) return next(err);
				var encPass = hash;
				var document = {
					org_name: 		req.params.orgName.toLowerCase(),
					username: 		data.username, 
					email: 			data.email,
					password: 		encPass,
					avatar: 		data.avatar,
					no_followers: 	data.no_followers,
					following_no: 	data.following_no
				};

				objCol.insertOne(document, function(err, res2) {
					if(err) throw err;
					console.log("Member inserted.");
					res.status(201).send('Member: "' + data.username + '" for ' + req.params.orgName + ' has been saved.');
				});
			});
		});
	}else{
		res.status(200).send('Error: Invalid JSON format in the request body.');
	}
}

module.exports = { getMembers, postMembers }