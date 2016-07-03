var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * banner Model
 * =============
 */

var banner = new keystone.List('banner', {});

banner.add({
	title: { type: String,  default:'' },
	content:{ type: String, default:''},
	isShow: { type: Types.Select, options: 'yes, no', default: 'no', index: true },
	images: { type: Types.LocalFiles, dest:global.localFilePath },
	linkUrl: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	publishedDate: { type: Date},
});

banner.defaultColumns = 'title, content|20%, linkUrl|20%, sort|20%';
banner.register();
