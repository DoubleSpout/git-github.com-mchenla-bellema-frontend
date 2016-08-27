var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {};
	asyncList = [];

	//get picture
	asyncList.push(function(callback){
		keystone.list('banner').model.find({'isShow':'yes'}).sort({'sort':1}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.banners = results;
			//console.log(results)
			callback()
		});
	});

	//get product
	asyncList.push(function(callback){
		keystone.list('Product').model.find({'putOnHome':'yes', 'state':'published'}).sort({'sort':1}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.products = results;
			//console.log(results)
			callback()
		});
	});


	//get customer
	asyncList.push(function(callback){
		keystone.list('CustomerFeedback').model.find({}).sort({'sort':1}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.customers = results;
			//console.log(results)
			callback()
		});
	});


	//get partner
	asyncList.push(function(callback){
		keystone.list('partner').model.find({}).sort({'sort':1}).exec(function (err, results) {

			if (err) {
				return callback(err);
			}

			locals.data.partners = results;
			//console.log(results)
			callback()
		});
	});


	async.parallel(asyncList, function(err){
		if(err){
			console.log('index.js| async.parallel error', err);
			return res.status(500).end();
		}
		// Render the view
		view.render('index');
	})
	
};
