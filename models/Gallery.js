var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	intro:{ type: String, default:''},
	state: { type: Types.Select, options: 'home, side', default: 'home', index: true },
	publishedDate: { type: Date},
	//heroImage: { type: Types.LocalFile, dest:global.localFilePath },
	images: { type: Types.LocalFiles, dest:global.localFilePath },
	linkUrl: { type: String, default:'' },
});

Gallery.defaultColumns = 'name, state|20%, heroImage|20%, publishedDate|20%';
Gallery.register();
