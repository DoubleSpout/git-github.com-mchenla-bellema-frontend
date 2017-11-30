var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var asyncList = [];
	var locals = res.locals;
	locals.data = {};
	var id = req.query.id || '';

	if(!id || id.length != 24){
		return res.status(400).end('invalid id');
	}

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blog_info';

	
	//get side
	asyncList.push(function(callback){
		keystone.list('TipSolution').model.find({'state':'published', 'putOnSide':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.sideData = JSON.parse(JSON.stringify(results));
			locals.data.sideData.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})
			//console.log(results)
			callback()
		});
	});


	//recent post
	asyncList.push(function(callback){
		keystone.list('TipSolution').model.find({'state':'published'}).sort({'publishedDate':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}


			locals.data.recentData = JSON.parse(JSON.stringify(results));
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
		keystone.list('TipSolution').model.count({'state':'published'}).exec(function (err, results) {

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
	
		keystone.list('TipSolution').model.find({'_id':id}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.data = JSON.parse(JSON.stringify(results));
			if(locals.data.data.length == 0){
				return callback('not found blog');
			}



			locals.data.data.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})
			//console.log(results)
			callback()
		});
	});


	//data List 
	asyncList.push(function(callback){

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

		locals.title = 'TipSolution|BelleMa'
		locals.NavTip = 'TipSolution'
		locals.NavLink = '/breastfeeding/tipsolution/list'
		locals.bannberUrl = '/img/banner1-@2x.png'
		//locals.page = getPageObj(page, perPage, locals.data.countData, '/blog/list');
		// Render the view
		view.render('blog_info');

	})


};
