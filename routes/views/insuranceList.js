var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var asyncList = [];
	var page = (req.query.page || 1)-0;
	var perPage = 10;

	if(isNaN(page)){
		return res.status(400).end('invalid page');
	}
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blog_list';
	locals.data = {};

	//get side
	asyncList.push(function(callback){
		keystone.list('InsuranceState').model.find({'status':'published'}).sort({'sort':1}).limit(10000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.state = results //JSON.parse(JSON.stringify());
			// locals.data.sideData.map(function(item){
			// 	 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
			// 	 return item
			// })
			//console.log(results)
			callback();
		});
	});


	//recent post
	asyncList.push(function(callback){
		keystone.list('InsurancePlanList').model.find({'status':'published'}).sort({'sort':1}).limit(10000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}


			locals.data.PlanList = results; //JSON.parse(JSON.stringify(results));;
			// locals.data.recentData.map(function(item){
			// 	 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
			// 	 return item
			// })
			//console.log(results)
			callback()
		});
	});

	//recent post
	asyncList.push(function(callback){
		keystone.list('InsurancePlanInfo').model.find({'status':'published'}).sort({'sort':1}).limit(10000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}


			locals.data.PlanInfo = results; //JSON.parse(JSON.stringify(results));;
			// locals.data.recentData.map(function(item){
			// 	 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
			// 	 return item
			// })
			//console.log(results)
			callback()
		});
	});


	async.parallel(asyncList, function(err){
		if(err){
			console.log('insuranceList.js| async.parallel error', err);
			return res.status(500).end();
		}

		locals.title = 'Insurance|BelleMa'
		// Render the view
		view.render('insurance_list');
	})


	
};
