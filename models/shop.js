var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Distributor Model
 * =============
 */

var Shop = new keystone.List('Shop', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Shop.add({
	name: { type: String, required: true },
	address :{ type: String, default:''},
	phone:{ type: String, default:''},
	zipcode:{ type: String, default:''},

	lat:{ type: Number, default:0},
	lng:{ type: Number, default:0},

	sort:{ type: Number, default:1 },
	publishedDate: { type: Date},
	distributor: { type: Types.Relationship, ref: 'Distributor', many: false ,  index:true},
	 
});

Shop.defaultColumns = 'name, address|20%, phone|20%, zipcode|20%';
Shop.register();
