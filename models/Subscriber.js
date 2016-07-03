var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Subscriber Model
 * =============
 */

var Subscriber = new keystone.List('Subscriber', {});

Subscriber.add({
	email: { type: String, default:'' },
	sourceIp: { type: String, default:'' },
	userAgent: { type: String, default:'' },
	publishedDate: { type: Date},
	//heroImage: { type: Types.LocalFile, dest:global.localFilePath },
	
});

Subscriber.defaultColumns = 'email, sourceIp|20%, userAgent|20%, publishedDate|20%';
Subscriber.register();
