var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * registproduct Model
 * =============
 */

var registproduct = new keystone.List('registproduct', {});

registproduct.add({
	code:  { type: String,  default:'', label:'Product NO.'},
	SN: 	{ type: String,  default:'', label:'S/N'},
	buyDate: { type: Date},
	buyAddr: { type: String, default:'' },
	userName: { type: String, default:'' },
	telphone: { type: String, default:'' },
	address: { type: String, default:'' },
	sort:{ type: Number, default:1 },

});

registproduct.defaultColumns = 'code, SN|20%, buyDate|20%, buyAddr|20%';
registproduct.register();
