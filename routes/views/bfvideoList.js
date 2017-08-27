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
		keystone.list('Blog').model.find({'state':'published', 'putOnSide':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.sideData = JSON.parse(JSON.stringify(results));
			locals.data.sideData.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})
			//console.log(results)
			callback();
		});
	});


	//recent post
	asyncList.push(function(callback){
		keystone.list('Blog').model.find({'state':'published'}).sort({'publishedDate':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}


			locals.data.recentData = JSON.parse(JSON.stringify(results));;
			locals.data.recentData.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})
			//console.log(results)
			callback()
		});
	});


	//count 
	asyncList.push(function(callback){
		var q = {'state':'published'};
		var keywords = (req.query.keywords || '').trim()

		if(keywords != ''){
			q['title'] = {"$regex":req.query.keywords}
		}


		keystone.list('Blog').model.count(q).exec(function (err, results) {

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
		var q = {'state':'published'};
		var keywords = (req.query.keywords || '').trim()

		if(keywords != ''){
			q['title'] = {"$regex":req.query.keywords}
		}

		keystone.list('Blog').model.find(q).sort({'sort':1}).limit(perPage).skip(skipNum).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.data = JSON.parse(JSON.stringify(results));
			locals.data.keywords = keywords

			locals.data.data.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})
			locals.keywords = keywords
			//console.log(results)
			callback()
		});
	});


	//data List 
	asyncList.push(function(callback){
		var skipNum = perPage * (page-1)
		keystone.list('Adv').model.find({'showOnBlog':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

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
		locals.title = 'Resources|BelleMa'
		// Render the view
		view.render('bfvideo_list');
	})


	
};
