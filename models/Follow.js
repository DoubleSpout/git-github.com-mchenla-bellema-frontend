var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Follow Model
 * =============
 */

var Follow = new keystone.List('Follow', {
	autokey: { from: 'title', path: 'key', unique: true },
});

Follow.add({
	title:{ type: String, default:''},
	linkUrl :{ type: String, default:''},
	icon: { type: Types.LocalFiles, dest:global.localFilePath },
	publishedDate: { type: Date},
});

Follow.defaultColumns = 'name, branchName|20%, phone|20%, website|20%';
Follow.register();
