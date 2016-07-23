var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Review Model
 * ==========
 */

var Review = new keystone.List('Review', {});

Review.add({
	source : { type: String,  default:'' },
	star:{type:Number},
	title : { type: String,  default:'' },
	content: {
		//brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	
	publishedDate: { type: Types.Date, index: true },
	sort: {type:Number, index:true},
	product: { type: Types.Relationship, ref: 'Product', many: false ,  index:true},
});

Review.defaultColumns = 'source, star|20%, content|20%, publishedDate|20%';

Review.register();
