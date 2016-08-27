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
		keystone.list('Shop').model.find({}).sort({'sort':1}).limit(1000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.data = results;

			locals.data.data.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('LL')
				 return item
			})
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
		locals.section = 'distributor';

		// Render the view
		view.render('distributor');
	})


};
