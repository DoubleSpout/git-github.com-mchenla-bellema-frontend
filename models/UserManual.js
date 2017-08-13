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
	info: 	{ type: String,  default:'',},
	jumpurl: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

UserManual.defaultColumns = 'name,date |40%, info|40%, sort|20%';
UserManual.register();
