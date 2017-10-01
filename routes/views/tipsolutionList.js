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

	var TroubleShooting = '123456789012345678901234';
	var TipSolution = '123456789012345678901234';
	var PressRealse = '123456789012345678901234';


	//get side
	asyncList.push(function(callback){
		keystone.list('BlogCategory').model.find().limit(1000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			results.forEach(function(item){
				if(item.name == 'TroubleShooting'){
						TroubleShooting = item._id;
				}
				if(item.name == 'TipSolution'){
						TipSolution = item._id;
				}
				if(item.name == 'PressRealse'){
						PressRealse = item._id;
				}
			})

			// console.log(results)


			callback();
		});
	});


	//get side
	asyncList.push(function(callback){
		keystone.list('TipSolution').model.find({ 'state':'published', 'putOnSide':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

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
		keystone.list('TipSolution').model.find({'state':'published'}).sort({'publishedDate':-1}).limit(3).exec(function (err, results) {

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


		keystone.list('TipSolution').model.find({}).count(q).exec(function (err, results) {

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

		keystone.list('TipSolution').model.find(q).sort({'sort':1}).limit(perPage).skip(skipNum).exec(function (err, results) {

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
		locals.title = 'TipSolution|BelleMa'
		locals.NavTip = 'TipSolution'
		locals.NavLink = '/breastfeeding/tipsolution/info'
		locals.bannberUrl = '/img/banner1-@2x.png'
		// Render the view
		view.render('blog_list');
	})


	
};
