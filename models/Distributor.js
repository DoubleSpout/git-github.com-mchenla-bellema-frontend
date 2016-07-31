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
	website :{ type: String, default:''},
	logo: { type: Types.LocalFiles, dest:global.localFilePath },
	phone:{ type: String, default:''},
	sort:{ type: Number, default:1 },
	publishedDate: { type: Date},
});

Distributor.relationship({ ref: 'Shop', path: 'distributor' });

Distributor.defaultColumns = 'name, website|20%, phone|20%, publishedDate|20%';
Distributor.register();
