var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Organizations Model
 * =============
 */

var Organizations = new keystone.List('Organizations', {});

Organizations.add({
	name:  { type: String,  default:'', },
	homepage: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

Organizations.defaultColumns = 'name |40%, homepage|40%, sort|20%';
Organizations.register();
