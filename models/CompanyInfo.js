var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CompanyInfo Model
 * =============
 */

var CompanyInfo = new keystone.List('CompanyInfo', {});

CompanyInfo.add({
	telphone:  { type: String,  default:'', },
	email: { type: String, default:'' },

	twitterUrl:  { type: String, default:'' },
	googlePlusUrl:  { type: String, default:''},
	facebookUrl:  { type: String, default:'' },
	linkedinUrl:  { type: String, default:'' },

	sort:{ type: Number, default:1 },

	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

CompanyInfo.defaultColumns = 'telphone|20%, email|50%, sort|30%';
CompanyInfo.register();

