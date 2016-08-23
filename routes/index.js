/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

var syncfb = require('./syncfb.js');
// Setup Route Bindings
exports = module.exports = function (app) {


	app.get('/bellema-admin', function(req, res){
			res.redirect('/keystone')
	}); //process.env.PREFIX = /my/subdirectory

	app.set('trust proxy', 'loopback') // 指定唯一子网
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/list', routes.views.blogList);
	app.get('/blog/info', routes.views.blogInfo);
	app.get('/distributor', routes.views.distributor);
	app.get('/support', routes.views.support);

	app.get('/product/list', routes.views.productList);
	app.get('/product/info', routes.views.productInfo);

	app.post('/sub/post', routes.views.sub);

	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/policy', routes.views.policy);
	app.all('/contact', routes.views.contact);


	app.post('/sync/fb/fd6c3f5ad15338e4a3c6b79fca2c8468', syncfb.syncfb)



	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
