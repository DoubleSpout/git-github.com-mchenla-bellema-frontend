var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SiteSetting Model
 * =============
 */

var SiteSetting = new keystone.List('SiteSetting', {});

SiteSetting.add({
	title: { type: String,  default:'site setting' },
	topLogo: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'183 * 52' },
	footLogo: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'175 * 50' },
	contactBg: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'310 * 584' },

	sort:{ type: Number, default:1 },

});

SiteSetting.defaultColumns = 'title, sort|20%';
SiteSetting.register();
