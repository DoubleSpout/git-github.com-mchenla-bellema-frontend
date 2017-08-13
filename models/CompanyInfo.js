var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CompanyInfo Model
 * =============
 */

var CompanyInfo = new keystone.List('CompanyInfo', {});

CompanyInfo.add({
	telphone:  { type: String,  default:'', },
	address: 	{ type: String,  default:'',},
	email: { type: String, default:'' },
	SocialMedia: { type: String, default:'' },
	sort:{ type: Number, default:1 },

});

CompanyInfo.defaultColumns = 'telphone|20%, address|50%, email|30%';
CompanyInfo.register();

