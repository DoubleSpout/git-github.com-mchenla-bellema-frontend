var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Distributor Model
 * =============
 */

var Distributor = new keystone.List('Distributor', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Distributor.add({
	name: { type: String, required: true },
	branchName:{ type: String, default:''},
	shopName:{ type: String, default:''},
	address :{ type: String, default:''},
	zipcode:{ type: String, default:''},
	phone:{ type: String, default:''},
	website :{ type: String, default:''},
	images: { type: Types.LocalFiles, dest:global.localFilePath },
	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	publishedDate: { type: Date},
});

Distributor.defaultColumns = 'name, branchName|20%, phone|20%, website|20%';
Distributor.register();
