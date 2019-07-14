const mongoClient = require('mongodb').MongoClient;
const config = require('./config');

const dbURL = (config.use_local_db==1 ? config.local_db_url : config.remote_db_url);
var db;

module.exports = {
	connectToServer: function(callback) {
		mongoClient.connect(dbURL,  { useNewUrlParser: true }, function(err, client) {
			db  = client.db(config.db_name);
			return callback(err);
	  	});
	},
  
	getDb: function() {
	  	return db;
	}
};