var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Social Model
 * =============
 */

var Social = new keystone.List('Social', {});

Social.add({
	name:{ type: String, default:''},
	linkUrl :{ type: String, default:''},
	icon: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'80*80' },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Date},
});

Social.defaultColumns = 'name, status|20%, linkUrl|20%, publishedDate|20%';
Social.register();
