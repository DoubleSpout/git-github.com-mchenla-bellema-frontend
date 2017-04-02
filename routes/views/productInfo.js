var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var asyncList = [];
	var locals = res.locals;
	locals.data = {};
	locals.query = req.query;
	var id = req.query.id || '';
	var perPage = 10;


	if(!id || id.length != 24){
		return res.status(400).end('invalid id');
	}

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'product_info';

	var catId = '';
	var productId = '';

	//data List 
	asyncList.push(function(callback){
	
		keystone.list('Product').model.find({'_id':id}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.data = JSON.parse(JSON.stringify(results));
			if(locals.data.data.length == 0){
				return callback('not found product');
			}

			locals.data.pdfUrl = '';
			if(locals.data.data[0].supportPdfUrl && locals.data.data[0].supportPdfUrl[0] && locals.data.data[0].supportPdfUrl[0].filename){
				locals.data.pdfUrl = locals.data.data[0].supportPdfUrl[0].filename;
			}

			locals.data.data.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})

			productId = results[0]._id;
			catId = (results[0]['categories'][0] || '').toString().trim();
			//console.log('########', catId, !catId, catId.length!=24)
			if(!catId || catId.length != 24){
				callback('invalid categories id');
				return
			}
			//console.log(results)
			callback()
		});
	});



	//get cat name
	asyncList.push(function(callback){
	
		keystone.list('ProductCategory').model.find({'_id':catId}).limit(1).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.catObj = results;
			if(locals.data.catObj.length == 0){
				return callback('not found ProductCategory');
			}
			callback()
		});
	});


	//get reviews
	asyncList.push(function(callback){
		
		keystone.list('Review').model.find({'product':productId}).sort({'sort':1}).skip(0).limit(10000).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.reviews = JSON.parse(JSON.stringify(results));
			locals.data.reviews.map(function(item){
				 item.publishedDate = moment(item.publishedDate).format('MM/DD/YYYY HH:SS')
				 return item
			})

			keystone.list('Review').model.count({'product':productId}).exec(function (err, results) {
				if (err) {
					return callback(err);
				}

				locals.reviewsCount = results
				if(locals.reviewsCount>10000){
					locals.reviewsCount = 10000
				}	
				callback()
			});

			
		});
	});


	//get cat other productions
	asyncList.push(function(callback){
		
		keystone.list('Product').model.find({'state':'published', 'categories':{'$all':[catId]}, "_id":{"$ne":productId} })
		.sort({'sort':1}).skip(0).limit(12).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.otherProds = results;
			callback()

		});
	});



	//exec async
	async.series(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}

		locals.title = 'Products|BelleMa'

		// Render the view
		view.render('product_info');
	})


	
};
