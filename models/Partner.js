var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * partner Model
 * =============
 */

var partner = new keystone.List('partner',{});

partner.add({
	title: { type: String, default:'' },
	partnerName: { type: String, default:''},
	logo: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'390 * 210' },
	sort:{ type: Number, default:1 },
	linkUrl: { type: String, default:'' },
	publishedDate: { type: Date},
});

partner.defaultColumns = 'title, name|20%, linkUrl|20%, sort|20%';
partner.register();
