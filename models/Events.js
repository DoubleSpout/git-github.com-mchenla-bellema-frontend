var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Events Model
 * =============
 */

var Events = new keystone.List('Events', {});

Events.add({
	name:  { type: String,  default:'', },
	date: 	 { type: Date},
	info: 	{ type: String,  default:'',},
	jumpurl: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

Events.defaultColumns = 'name,date |40%, info|40%, sort|20%';
Events.register();
