var keystone = require('keystone');
var async = require('async');
var moment= require('moment');
var getPageObj = require('../util.js').getPageObj;



exports = module.exports = function (req, res) {
	var ip = req.ips[0] || req.ip;
	var ua = req.get('User-Agent');
	var now = new Date();

	var data = {

		name:req.body.name,

		mobile:req.body.mobile,

		desc:req.body.desc,

		clientIp:ip,

		userAgent:ua,

		publishedDate:now,

		insurancestates:req.body.InsuranceStateId,

		insuranceplanlist:req.body.InsurancePlanListId,

	};




	keystone.list('InsuranceNotList').model.findOneAndUpdate({'publishedDate':moment().year(100)}, data, {'upsert':true}).exec(function (err, results) {

			if (err) {
				return res.json({'error':err})
			}

			return res.json({'error':false, 'data':'ok'})
		});
	
};

















