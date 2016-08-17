var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Policy Model
 * =============
 */

var policy = new keystone.List('policy',{
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

policy.add({
	title: { type: String, default:'' },
	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	publishedDate: { type: Date},
});

policy.defaultColumns = 'title, publishedDate|20%';
policy.register();
