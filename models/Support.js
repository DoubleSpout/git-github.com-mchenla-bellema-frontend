var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Support Model
 * =============
 */

var Support = new keystone.List('Support', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Support.add({
	name: { type: String, required: true, index:true, default:'' },
	images: { type: Types.CloudinaryImages },
	content: {
		answer: { type: Types.Html, wysiwyg: true, height: 150 },
	},
	publishedDate: { type: Date, default: Date.now },
});

Support.defaultColumns = 'name, publishedDate|20%';
Support.register();
