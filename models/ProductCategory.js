var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductCategory.add({
	name: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
});

ProductCategory.relationship({ ref: 'Product', path: 'categories' });

ProductCategory.register();
