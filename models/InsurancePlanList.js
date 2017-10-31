var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * InsurancePlanList Model
 * ==================
 */

var InsurancePlanList = new keystone.List('InsurancePlanList', {
	autokey: { from: 'name', path: 'key', unique: true },
});

InsurancePlanList.add({
	name: { type: String, required: true },
	desc: { type: String, default:'' },
	//image: { type: Types.CloudinaryImage },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	insurancestates: { type: Types.Relationship, ref: 'InsuranceState', many: true },
});

InsurancePlanList.relationship({ ref: 'InsurancePlanInfo', path: 'insuranceplanlist' });
InsurancePlanList.relationship({ ref: 'InsuranceNotList', path: 'insuranceplanlist' });

InsurancePlanList.defaultColumns = 'name, desc|40%, sort|20%';
InsurancePlanList.register();
