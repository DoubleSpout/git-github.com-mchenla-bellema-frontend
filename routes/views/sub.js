var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var email = req.body.email;
	var ip = req.ips[0] || req.ip;
	var ua = req.get('User-Agent');
	var now = new Date();

	keystone.list('Subscriber').model.findOneAndUpdate({'email':email}, {
		'email':email,
		'sourceIp':ip,
		'userAgent':ua,
		'publishedDate':now,
	}, {'upsert':true}).exec(function (err, results) {

			if (err) {
				return res.json({'error':err})
			}

			return res.json({'error':false, 'data':'ok'})
		});
	
};
