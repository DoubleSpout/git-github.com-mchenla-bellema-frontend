var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Support Model
 * =============
 */

var Support = new keystone.List('FAQs', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Support.add({
	name: { type: String, required: true, index:true, default:'' },
	//images: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'*80' },
	content: {
		answer: { type: Types.Html, wysiwyg: true, height: 150 },
	},
	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	sort:{ type: Number, default:1 },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Support.defaultColumns = 'name, state, publishedDate';
Support.register();
