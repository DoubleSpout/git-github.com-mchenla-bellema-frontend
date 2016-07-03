var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
	title: { type: String, required: true, index: true},
	
	intro: { type: String, default:'' },
	code:  { type: String,  default:'' },
	availability:{ type: Types.Select, options: 'in stock, not sell', default: 'in stock',},	//1 is in stock, 2 is not sell
	stars: { type: Types.Select, options: '1, 2, 3, 4, 5', default: '5',},
	price: { type: Number,  default:0 },
	amazonBuyUrl: { type: String, default:'' },
	putOnHome: { type: Types.Select, options: 'no, yes', default: 'no',},	//0 is not
	putOnSide: { type: Types.Select, options: 'no, yes', default: 'no',},	//0 is not

	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	cover:  { type: Types.LocalFiles, dest:global.localFilePath },
	images: { type: Types.LocalFiles, dest:global.localFilePath },

	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true },
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended //|| this.content.brief;
});

Product.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Product.register();
