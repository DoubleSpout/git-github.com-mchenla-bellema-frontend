var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Coalitions Model
 * =============
 */

var Coalitions = new keystone.List('Coalitions', {});

Coalitions.add({
	name:  { type: String,  default:'', },
	country: 	{ type: String,  default:'', },
	address: 	{ type: String,  default:'',},
	telphone: { type: String, default:'' },
	homepage: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

Coalitions.defaultColumns = 'name,telphone |40%, country|40%, sort|20%';
Coalitions.register();
