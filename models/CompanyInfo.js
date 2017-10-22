var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CompanyInfo Model
 * =============
 */

var CompanyInfo = new keystone.List('CompanyInfo', {});

CompanyInfo.add({
	name:{type: String,  default:'', },

	icons: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'32 * 32' },

	isEmail: { type: Types.Select, options: 'yes, no', default: 'no'},

	text: { type: String, default:'' },
	jumpUrl:{ type: String, default:'' },

	sort:{ type: Number, default:1 },

	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

CompanyInfo.defaultColumns = 'name|20%, text|50%, sort|30%';
CompanyInfo.register();

