var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;



exports = module.exports = function (req, res) {
	var ip = req.ips[0] || req.ip;
	var ua = req.get('User-Agent');
	var now = new Date();

	var data = {

		Model:req.body.ProductId,

		SN:req.body.SN,

		buyDate:new Date(req.body.PurchasingDate-0),

		buyAddr:req.body.PurchasingAddress,

		lastName:req.body.LastName,

		firstName:req.body.FirstName,

		email:req.body.Email,

		telphone:req.body.Telephone,

		address:req.body.HomeAddress,

		clientIp:ip,

		userAgent:ua,

		postDate:now,

	};




	keystone.list('registproduct').model.findOneAndUpdate({'postDate':moment().year(100)}, data, {'upsert':true}).exec(function (err, results) {

			if (err) {
				return res.json({'error':err})
			}

			return res.json({'error':false, 'data':'ok'})
		});
	
};

