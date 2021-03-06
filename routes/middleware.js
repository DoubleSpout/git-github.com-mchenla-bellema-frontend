/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');
var async = require('async');
var moment= require('moment');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];


	keystone.list('ProductCategory').model.find().sort({'sort':1}).limit(1000).exec(function (err, results) {

			if (err) {
				return next(err);
			}

			keystone.list('ProductTag').model.find().sort({'sort':1}).limit(1000).exec(function (err, resultsTag) {
				
				if (err) {
					return next(err);
				}

				for(var j=0;j<results.length;j++){
					if(!results[j]['tags']){
						results[j]['tags'] = [];
					}
					for(var i=0;i<resultsTag.length;i++){
						if(results[j]['_id'] && resultsTag[i]['categories'] && results[j]['_id'].toString() == resultsTag[i]['categories'].toString()){
							results[j]['tags'].push(resultsTag[i])
						}
					}
				}
				

				keystone.list('customer_service_url').model.find().sort({'sort':1}).limit(1).exec(function (err, customUrlResult) {


					keystone.list('SiteSetting').model.find().sort({'sort':1}).limit(1).exec(function (err, settingResult) {

							if (err) {
								return next(err);
							}

							var toplogoUrl = '/img/footLogo.png';
							var footlogoUrl = '/img/new-logo.png';
							var contactBgUrl = '/img/map.jpg'

							// console.log(settingResult)

							if(settingResult.length >0 && settingResult[0] && 
								Array.isArray(settingResult[0]['topLogo']) &&
								settingResult[0]['topLogo'].length > 0 &&
								settingResult[0]['topLogo'][0]['filename']){

								toplogoUrl = '/upload/'+settingResult[0]['topLogo'][0]['filename'];

							}

							if(settingResult.length >0 && settingResult[0] && 
								Array.isArray(settingResult[0]['footLogo']) &&
								settingResult[0]['footLogo'].length > 0 &&
								settingResult[0]['footLogo'][0]['filename']){

								footlogoUrl = '/upload/'+settingResult[0]['footLogo'][0]['filename'];

							}


							if(settingResult.length >0 && settingResult[0] && 
								Array.isArray(settingResult[0]['contactBg']) &&
								settingResult[0]['contactBg'].length > 0 &&
								settingResult[0]['contactBg'][0]['filename']){

								contactBgUrl = '/upload/'+settingResult[0]['contactBg'][0]['filename'];

							}


							var customerUrl = '#'
							if(customUrlResult.length > 0 && customUrlResult[0] && customUrlResult[0]['linkUrl']){
								customerUrl = customUrlResult[0]['linkUrl']
							}

							res.locals.productMenu = results;
							res.locals.product1st = results[0]
							res.locals.user = req.user;
							res.locals.customerUrl = customerUrl;
							res.locals.toplogoUrl = toplogoUrl;
							res.locals.footlogoUrl = footlogoUrl;

							res.locals.navProduct = []


							next();

					})

				})

			})


	})

	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
