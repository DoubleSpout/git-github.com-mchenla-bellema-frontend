var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * ProductCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductCategory.add({
	name: { type: String, required: true },
	desc: { type: String, default:'' },
	image: { type: Types.CloudinaryImage },
});

ProductCategory.relationship({ ref: 'Product', path: 'categories' });

ProductCategory.register();
