var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * homeCustom Model
 * =============
 */

var homeCustom = new keystone.List('CustomerFeedback', {});

homeCustom.add({
	title: { type: String, default:'' },
	content:{ type: String, default:''},
	reviewName:{ type: String, default:''},
	images: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'180 * 180' },
	sort:{ type: Number, default:1 },
	publishedDate: { type: Date},
});

homeCustom.defaultColumns = 'title, content|20%, reviewName|20%, sort|20%';
homeCustom.register();
