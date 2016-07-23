var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var asyncList = [];
	var page = (req.query.page || 1)-0;
	var catName = (req.query.cat || '');
	var sort = req.query.sort || 'sort';
	var perPage = 10;

	if(isNaN(page)){
		return res.status(400).end('invalid page');
	}

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'blog_list';
	locals.data = {};


	//get side
	var defaultCat = '';
	var CatId= '';
	asyncList.push(function(callback){
		keystone.list('ProductCategory').model.find().sort({'sort':-1}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.catData = results;
			defaultCat = locals.data.catData[0].name;
			CatId = locals.data.catData[0]._id;

			//not catName
			if(!catName){
				catName = defaultCat
			}

			//get cat count
			var catAsyncList = [];
			locals.data.catData.forEach(function(item, i){
				var sel = false;
				if(item.name == catName){
					sel = true;
					CatId = item._id;
				}

				catAsyncList.push(function(asyncCb){
					keystone.list('Product').model.count({'state':'published', categories:{'$in':[item._id]}}).exec(function (err, results) {
						if(err) return asyncCb(err);
						locals.data.catData[i] = {
							'name':item.name,
							'count':results,
							'sel':sel,
						}
						asyncCb();
					})
				})
			})

			//end get cat per count
			async.parallel(catAsyncList, function(err){
				if(err){
					callback(err);
					return
				}
				callback();
			})

		});
	});


	//adv List 
	asyncList.push(function(callback){
		var skipNum = perPage * (page-1)
		keystone.list('Adv').model.find({'showOnProductList':'yes'}).sort({'sort':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.adv = results;

			//console.log(results)
			callback()
		})
	})


	//side product
	asyncList.push(function(callback){

		keystone.list('Product').model.find({'state':'published', 'putOnSide':'yes'}).sort({'sort':-1}).limit(3).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.sideProduct = results;

			//console.log(results)
			callback()
		})
	})

	//count 
	asyncList.push(function(callback){
		keystone.list('Product').model.count({'state':'published', categories:{'$in':[CatId]}}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.countData = results;
			//console.log(results)
			callback();
		});
	});


	//side product
	asyncList.push(function(callback){

		var skipNum = perPage * (page-1);
		var sortObj = {};
		sortObj[sort] = -1;

		//console.log(CatId)

		keystone.list('Product').model.find({'state':'published', categories:{'$in':[CatId]}}).sort(sortObj).limit(perPage).skip(skipNum).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.productData = results;

			//console.log(results)
			callback();
		})
	})


	async.series(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}

		locals.page = getPageObj(page, perPage, locals.data.countData, '/product/list?cat='+catName+'&sort='+sort);



		locals.sortObj = {
			'page':1,
			'cat':catName,
			'sort':sort,
		}
		// Render the view
		view.render('product_list');
	})


};
