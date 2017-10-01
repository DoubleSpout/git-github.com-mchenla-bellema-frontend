var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * registproduct Model
 * =============
 */

var registproduct = new keystone.List('registproduct', {});

registproduct.add({
	Model: { type: Types.Relationship, ref: 'ProductCategory', many: false },
	SN: 	{ type: String,  default:'', label:'S/N'},
	buyDate: { type: Date},
	buyAddr: { type: String, default:'' },
	firstName: { type: String, default:'' },
	lastName: { type: String, default:'' },
	email: { type: String, default:'' },
	telphone: { type: String, default:'' },
	address: { type: String, default:'' },
	clientIp: { type: String, default:'' },
	userAgent:{ type: String, default:'' },
	postDate: { type: Date, index: true},
	sort:{ type: Number, default:1 },

});

registproduct.defaultColumns = 'Model, postDate|15%, SN|10%, buyDate|15%, buyAddr|20%, clientIp|10%';
registproduct.register();
