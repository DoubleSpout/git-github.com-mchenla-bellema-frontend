var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Social Model
 * =============
 */

var Social = new keystone.List('Social', {
	autokey: { from: 'title', path: 'key', unique: true },
});

Social.add({
	title:{ type: String, default:''},
	linkUrl :{ type: String, default:''},
	icon: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'80*80' },
	publishedDate: { type: Date},
});

Social.defaultColumns = 'name, branchName|20%, phone|20%, website|20%';
Social.register();
