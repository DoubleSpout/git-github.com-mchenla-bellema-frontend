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
	var tagId = req.query.tag || '';
	var perPage = 12;

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
		keystone.list('ProductCategory').model.find().sort({'sort':1}).exec(function (err, results) {

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

			keystone.list('ProductTag').model.find().sort({'sort':1}).limit(1000).exec(function (err, resultsTag) {
				
				if (err) {
					return next(err);
				}

				//get cat count
				var catAsyncList = [];
				locals.data.catData.forEach(function(item, i){
					//console.log("========")
					item['tags'] = [];

					resultsTag.forEach(function(tagItem){
						if(item['_id'] && tagItem['categories'] && item['_id'].toString() == tagItem['categories'].toString()){
							//console.log("========", tagId, tagItem['_id'].toString())

							if(tagId == tagItem['_id'].toString()){
								tagItem.sel = true
							}else{
								tagItem.sel = false
							}
							item['tags'].push(tagItem)
						}
					})


					var sel = false;
					if(item.name == catName){
						sel = true;
						CatId = item._id;
						locals.selCatName = item.name;
					}

					// var q = {'state':'published'}
					// if(catName != 'all'){
					// 	q = {'state':'published', categories:{'$in':[item._id]}}
					// }

					var q = {'state':'published', categories:{'$in':[item._id]}}

					catAsyncList.push(function(asyncCb){
						keystone.list('Product').model.count(q).exec(function (err, results) {
							if(err) return asyncCb(err);
							locals.data.catData[i] = {
								'name':item.name,
								'tags':item.tags,
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

			})

		});
	});


	//adv List 
	asyncList.push(function(callback){
		var skipNum = perPage * (page-1)
		keystone.list('Adv').model.find({'showOnProductList':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

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

		keystone.list('Product').model.find({'state':'published', 'putOnSide':'yes'}).sort({'sort':1}).limit(3).exec(function (err, results) {

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

		var q = {'state':'published'}
		if(catName != 'all'){
			q = {'state':'published', categories:{'$in':[CatId]}}
		}

		var qObj = q
		if(tagId && tagId != ""){
			qObj['tag'] = tagId;
		}
		keystone.list('Product').model.count(qObj).exec(function (err, results) {

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
		if(sort == 'sort'){
			sortObj[sort] = 1;
		}else{
			sortObj[sort] = -1;
		}

		var q = {'state':'published'}
		if(catName != 'all'){
			q = {'state':'published', categories:{'$in':[CatId]}}
		}
		
		var qObj = q
		//console.log(CatId)
		if(tagId && tagId != ""){
			qObj['tag'] = tagId;
		}
		keystone.list('Product').model.find(qObj).sort(sortObj).limit(perPage).skip(skipNum).exec(function (err, results) {

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

		locals.title = 'Products|BelleMa'
		// Render the view
		view.render('product_list');
	})


};
