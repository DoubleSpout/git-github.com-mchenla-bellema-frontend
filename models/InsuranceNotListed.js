var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * InsuranceNotList Model
 * ==================
 */

var InsuranceNotList = new keystone.List('InsuranceNotList');

InsuranceNotList.add({
	name: { type: String, required: true },
	mobile: { type: String, default:'' },
	desc: { type: String, default:'' },
	clientIp: { type: String, default:'' },
	userAgent: { type: String, default:'' },

	sort:{ type: Number, default:1 },
	publishedDate: { type: Types.Date, index: true},

	insurancestates: { type: Types.Relationship, ref: 'InsuranceState', many: false },
	insuranceplanlist: { type: Types.Relationship, ref: 'InsurancePlanList', many: false },
});

InsuranceNotList.defaultColumns = 'name, mobile, desc, insurancestates, insuranceplanlist, publishedDate';
InsuranceNotList.register();
