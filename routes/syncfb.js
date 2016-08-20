var keystone = require('keystone');
var async = require('async');
// Using require() in ES5
var graph = require('fbgraph');

var moment = require('moment');



exports.syncfb = function(req, res){

	var lastFaceBookTime = new Date('1970/1/1');
	var asyncList = [];
	asyncList.push(function(callback){

		keystone.list('Blog').model.find({'isFacebook':'yes'}).sort({'publishedDate':-1}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}
			if(!results || results.length == 0){
				return callback();
			}

			lastFaceBookTime = results[0]['publishedDate'];
			callback();

		});

	});


	asyncList.push(function(callback){


		// extending static access token
	    graph.extendAccessToken({
	        "client_id":      'conf.client_id',
	        "client_secret":  'conf.client_secret',
	    }, function (err, facebookRes) {
	       	
	       	if(err){
	       		return callback(err);
	       	}

    		var query = "SELECT * FROM user WHERE uid = me()";

			graph.fql(query, function(err, res) {
				if(err){
		       		return callback(err);
		       	}
			  	console.log(res); // { data: [ { name: 'Ricky Bobby' } ] }
			  	callback()
			});

	    });

	});




	async.series(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			res.json({'error':1, 'data':JSON.stringify(err)})
			return
		}

		res.json({'error':0, 'data':'ok'})
	})



	
}