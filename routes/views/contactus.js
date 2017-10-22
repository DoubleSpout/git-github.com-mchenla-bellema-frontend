var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var asyncList = [];
	locals.data = {};

	//data List 
	asyncList.push(function(callback){
		keystone.list('CompanyAddr').model.find({'status':'published'}).sort({'sort':1}).limit(4).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			if(results.length == 0){
				results = []
			}

			locals.data.dataAddr = results;

			// locals.data.dataAddr.map(function(item){
			// 	 item.publishedDate = moment(item.publishedDate).format('LL')
			// 	 return item
			// })
			//console.log(results)
			callback()
		});
	});


	//data List 
	asyncList.push(function(callback){
		keystone.list('CompanyInfo').model.find({'status':'published', 'name':{'$exists':true}}).sort({'sort':1}).limit(1000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			if(results.length == 0){
				results = []
			}
			locals.data.data = results;

			//console.log(results)
			callback()
		});
	});

	async.parallel(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'ContactUs';

		locals.title = 'ContactUs|BelleMa'
		// Render the view
		view.render('contactus');
	})
	
};
