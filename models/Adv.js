var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Adv Model
 * =============
 */

var Adv = new keystone.List('Adv', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Adv.add({
	name: { type: String, required: true },
	images: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'150*200' },
	linkUrl: { type: String, default:'' },
	//showOnHomePage:{ type: Types.Select, options: 'yes, no', default: 'no', index: true },
	showOnBlog: { type: Types.Select, options: 'yes, no', default: 'no', index: true },
	showOnProductList: { type: Types.Select, options: 'yes, no', default: 'no', index: true },
	//showOnProductDetail: { type: Types.Select, options: 'yes, no', default: 'no', index: true },
	sort: {type:Number, index:true},
	publishedDate: { type: Date},
	//heroImage: { type: Types.LocalFile, dest:global.localFilePath },
	
});

Adv.defaultColumns = 'name, linkUrl|20%, sort|20%, publishedDate|20%';
Adv.register();
