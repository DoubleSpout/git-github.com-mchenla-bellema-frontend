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
	//image: { type: Types.CloudinaryImage },
	sort:{ type: Number, default:1 },
});

ProductCategory.relationship({ ref: 'Product', path: 'categories' });
ProductCategory.relationship({ ref: 'registproduct', path: 'Model' });
ProductCategory.relationship({ ref: 'ProductTag', path: 'categories' });
ProductCategory.defaultColumns = 'name, desc|40%, sort|20%';
ProductCategory.register();
