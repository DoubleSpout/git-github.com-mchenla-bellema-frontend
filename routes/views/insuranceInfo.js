var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var asyncList = [];
	var locals = res.locals;
	locals.data = {};
	var id = req.query.id || '123456789012345678901234';

	// if(!id || id.length != 24){
	// 	return res.status(400).end('invalid id');
	// }

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blog_info';

	
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

	//data List 
	asyncList.push(function(callback){
	
		keystone.list('Blog').model.find({'_id':id}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.data = JSON.parse(JSON.stringify(results));
			if(locals.data.data.length == 0){
				//return callback('not found blog');
			}



			// locals.data.data.map(function(item){
			// 	 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
			// 	 return item
			// })
			//console.log(results)
			callback()
		});
	});


	async.parallel(asyncList, function(err){
		if(err){
			console.log('insuranceInfo.js| async.parallel error', err);
			return res.status(500).end();
		}

		locals.title = 'Insurance|BelleMa'

		//locals.page = getPageObj(page, perPage, locals.data.countData, '/blog/list');
		// Render the view
		view.render('insurance_info');

	})


};
