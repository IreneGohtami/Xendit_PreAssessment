function getComments(req, res) {
    var objCol = req.app.comCol;
	var query = { $and: [{org_name: req.params.orgName.toLowerCase()}, {status:1}] };

	objCol.find(query, {projection:{ _id: 0, org_name: 0, status: 0 }}).toArray(function(err, result) {
		if(err) throw err;
		if(result.length > 0){
			res.status(200).send(result);
		}
		else{
			res.status(200).send('No comments found for '+req.params.orgName+'.');
		}
	});
}

function postComments(req, res) {
    var contentType = req.headers['content-type'];
	if(contentType != "application/json"){
		res.status(412).send('Error: Content-Type in request header must be "application/json".');
	}
	var comment = req.body.comment;
	if(comment){
        var objCol = req.app.comCol;
		var document = { org_name: req.params.orgName.toLowerCase(), comment: comment, status:1 };
		objCol.insertOne(document, function(err, res2) {
			if(err) throw err;
			console.log("Comment inserted.");
			res.status(200).send('Comment: "' + comment + '" for ' + req.params.orgName + ' has been saved.');
		});
	}
	else{
		res.status(200).send('Error: Please pass a "comment" in a valid JSON format in the request body. Example: {"comment":"This is a comment"}');
	}
}

function deleteComments(req, res) {
    var objCol = req.app.comCol;
	var filter = { org_name: req.params.orgName.toLowerCase() };
	var document = { $set: { status:0 } };

	objCol.updateMany(filter, document, function(err, res2) {
		if(err) throw err;
		console.log("Comment deleted.");
		res.status(200).send("All comments on " + req.params.orgName + " have been deleted.");
	});
}

module.exports = { getComments, postComments, deleteComments }