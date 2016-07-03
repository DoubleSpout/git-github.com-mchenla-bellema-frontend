var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Feedback Model
 * =============
 */

var Feedback = new keystone.List('Feedback', {});

Feedback.add({
	name:{ type: String, default:'' },
	email: { type: String, default:'' },
	content: { type: String, default:'' },
	sourceIp: { type: String, default:'' },
	userAgent: { type: String, default:'' },
	publishedDate: { type: Date},
	//heroImage: { type: Types.LocalFile, dest:global.localFilePath },
	
});

Feedback.defaultColumns = 'name, email|20%, sourceIp|20%, publishedDate|20%';
Feedback.register();
