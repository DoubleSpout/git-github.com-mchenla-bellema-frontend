var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserManual Model
 * UserManual
 */

var UserManual = new keystone.List('UserManual', {});

UserManual.add({
	name:  { type: String,  default:'', },
	date: 	 { type: Date},
	files: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'pdf' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

UserManual.defaultColumns = 'name |40%, status|40%, sort|20%';
UserManual.register();
