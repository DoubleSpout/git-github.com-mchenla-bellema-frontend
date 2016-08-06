var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Product.add({
	name: { type: String, required: true, index: true},
	
	intro: { type: String, default:'' },
	code:  { type: String,  default:'' },
	availability:{ type: Types.Select, options: 'in stock, not sell', default: 'in stock',},	//1 is in stock, 2 is not sell
	stars: { type: Types.Select, options: '1, 2, 3, 4, 5', default: '5',},
	msrp: { type: Number,  default:0 },
	amazonBuyUrl: { type: String, default:'' },
	putOnHome: { type: Types.Select, options: 'no, yes', default: 'no',},	//0 is not
	putOnSide: { type: Types.Select, options: 'no, yes', default: 'no',},	//0 is not

	featureTitle:  { type: String,  default:'' },
	featureContent :  { type: String,  default:'' },

	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	cover:  { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'150*150' },
	images: { type: Types.LocalFiles, dest:global.localFilePath,imgSize:'600*600' },

	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	supportHtml:{type: Types.Html, wysiwyg: true, height: 400,  default:'' },
	supportPdfUrl:{ type: Types.LocalFiles, dest:global.localFilePath },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true },
	sort:{ type: Number, default:1 },
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended //|| this.content.brief;
});

Product.relationship({ ref: 'Review', path: 'product' });

Product.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Product.register();
