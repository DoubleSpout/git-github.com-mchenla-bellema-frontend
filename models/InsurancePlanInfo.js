var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * InsurancePlanInfo Model
 * ==========
 */

var InsurancePlanInfo = new keystone.List('InsurancePlanInfo', {
	autokey: { from: 'name', path: 'key', unique: true },
});

InsurancePlanInfo.add({
	name: { type: String, required: true, index: true},
	telphone: { type: String,  default:'' },
	jumpurl:{ type: String,  default:'' },
	sort:{ type: Number, default:1 },
	code:  { type: String,  default:'', label:'Product NO.'},
	
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },

	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	insurancestates: { type: Types.Relationship, ref: 'InsuranceState', many: true },
	insuranceplanlist: { type: Types.Relationship, ref: 'InsurancePlanList', many: true },
});


InsurancePlanInfo.defaultColumns = 'name, status|20%, publishedDate|20%, sort|10%, telphone|30%';
InsurancePlanInfo.register();
