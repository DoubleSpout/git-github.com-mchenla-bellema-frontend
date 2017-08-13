var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * video Model
 * =============
 */

var video = new keystone.List('video ', {});

video.add({
	name:  { type: String,  default:'', },
	videoScript: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

video.defaultColumns = 'name |40%, videoScript|40%, sort|20%';
video.register();
