var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var asyncList = [];
	var locals = res.locals;
	locals.data = {};
	

	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'policy';

	
	//get side
	asyncList.push(function(callback){
		keystone.list('policy').model.find({}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			if(!results || results.length == 0){
				locals.data.data = ''
			}
			locals.data.data = results[0];
			callback();
			//['content']['extended']
		});
	});


	async.parallel(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}

		//locals.page = getPageObj(page, perPage, locals.data.countData, '/blog/list');
		// Render the view
		view.render('policy');

	})


};
