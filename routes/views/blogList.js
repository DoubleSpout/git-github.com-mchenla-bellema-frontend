var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var asyncList = [];
	var page = (req.query.page || 1)-0;
	var perPage = 1;

	if(isNaN(page)){
		return res.status(400).end('invalid page');
	}
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blog_list';
	locals.data = {};

	//get side
	asyncList.push(function(callback){
		keystone.list('Blog').model.find({'state':'published', 'putOnSide':'yes'}).sort({'sort':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.sideData = results;
			locals.data.sideData.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('LL')
				 return item
			})
			//console.log(results)
			callback()
		});
	});


	//recent post
	asyncList.push(function(callback){
		keystone.list('Blog').model.find({'state':'published'}).sort({'publishedDate':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}


			locals.data.recentData = results;
			locals.data.recentData.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('LL')
				 return item
			})
			//console.log(results)
			callback()
		});
	});


	//count 
	asyncList.push(function(callback){
		keystone.list('Blog').model.count({'state':'published'}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.countData = results;
			//console.log(results)
			callback()
		});
	});


	//data List 
	asyncList.push(function(callback){
		var skipNum = perPage * (page-1)
		keystone.list('Blog').model.find({'state':'published'}).sort({'sort':-1}).limit(perPage).skip(skipNum).exec(function (err, results) {

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


	//data List 
	asyncList.push(function(callback){
		var skipNum = perPage * (page-1)
		keystone.list('Adv').model.find({'showOnBlog':'yes'}).sort({'sort':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.adv = results;

			//console.log(results)
			callback()
		});
	});

	async.parallel(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}

		locals.page = getPageObj(page, perPage, locals.data.countData, '/blog/list');
		// Render the view
		view.render('blog_list');
	})


	
};
