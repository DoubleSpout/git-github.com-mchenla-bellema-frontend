var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * InsuranceState Model
 * ==================
 */

var InsuranceState = new keystone.List('InsuranceState', {
	autokey: { from: 'name', path: 'key', unique: true },
});

InsuranceState.add({
	name: { type: String, required: true },
	desc: { type: String, default:'' },
	//image: { type: Types.CloudinaryImage },

	sort:{ type: Number, default:1 },

	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
});

InsuranceState.relationship({ ref: 'InsurancePlanInfo', path: 'insurancestates' });
InsuranceState.relationship({ ref: 'InsurancePlanList', path: 'insurancestates' });
InsuranceState.relationship({ ref: 'InsuranceNotList', path: 'insurancestates' });

InsuranceState.defaultColumns = 'name, desc|40%, sort|20%';
InsuranceState.register();
