var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * helpvideo Model
 * =============
 */

var helpvideo = new keystone.List('helpvideo', {});

helpvideo.add({
	name:  { type: String,  default:'', },
	info:  { type: String,  default:'', },
	images: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'230 * 150' },
	videoScript: { type: String, default:'' },
	sort:{ type: Number, default:1 },
	status: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

});

helpvideo.defaultColumns = 'name,status |40%, videoScript|40%, sort|20%';
helpvideo.register();
