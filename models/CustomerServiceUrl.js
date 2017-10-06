var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * customer_service_url Model
 * =============
 */

var customer_service_url = new keystone.List('customer_service_url', {
	autokey: { from: 'name', path: 'key', unique: true },
});

customer_service_url.add({
	name: { type: String, required: true },
	linkUrl: { type: String, default:'' },
	sort: {type:Number, index:true},
	publishedDate: { type: Date},
	
});

customer_service_url.defaultColumns = 'name, linkUrl|20%, sort|20%, publishedDate|20%';
customer_service_url.register();
