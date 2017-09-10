var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CompanyAddr Model
 * =============
 */

var CompanyAddr = new keystone.List('CompanyAddr', {});

CompanyAddr.add({
	name:  { type: String,  default:'', },
	addr: { type: String, default:'' },

	lat:  { type: String, default:'' },
	lng:  { type: String, default:''},

	sort:{ type: Number, default:1 },

});

CompanyAddr.defaultColumns = 'name,addr|60%, lat,lng|30%, sort|10%';
CompanyAddr.register();

