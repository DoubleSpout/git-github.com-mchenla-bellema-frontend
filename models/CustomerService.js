var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CustomerService Model
 * =============
 */

var CustomerService = new keystone.List('CustomerService', {});

CustomerService.add({
	name:  { type: String,  default:'', },
	address: 	{ type: String,  default:'',},
	telphone: { type: String, default:'' },
	homepage: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

CustomerService.defaultColumns = 'name,telphone |40%, address|40%, sort|20%';
CustomerService.register();
