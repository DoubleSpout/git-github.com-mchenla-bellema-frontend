var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PressRealse Model
 * ==========
 */

var PressRealse = new keystone.List('PressRealse', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

PressRealse.add({
	title: { type: String, required: true, index: true },
	intro: { type: String, default:'' },

	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	putOnSide: { type: Types.Select, options: 'no, yes', default: 'no', index: true }, //0 is not
	sideImg: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'80*80' },
	
	//author: { type: Types.Relationship, ref: 'User', index: true },
	autorName:{type: String, default:'Bellema'},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	cover: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'690*200' },
	images: { type: Types.LocalFiles, dest:global.localFilePath, imgSize:'690*200' },
	

	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	sort:{ type: Number, default:1 },
	isFacebook:{ type: Types.Select, options: 'no, yes', default: 'no'},
	facebookId:{type: String, default:'', index: true},
	categories: { type: Types.Relationship, ref: 'BlogCategory', many: true },
});

PressRealse.schema.virtual('content.full').get(function () {
	return this.content.extended //|| this.content.brief;
});

PressRealse.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
PressRealse.register();
