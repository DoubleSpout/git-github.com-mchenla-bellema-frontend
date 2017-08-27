var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * ProductTag Model
 * ==================
 */

var ProductTag = new keystone.List('ProductTag', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductTag.add({
	name: { type: String, required: true },
	desc: { type: String, default:'' },
	//image: { type: Types.CloudinaryImage },
	sort:{ type: Number, default:1 },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: false },
});

ProductTag.relationship({ ref: 'Product', path: 'tag' });
ProductTag.defaultColumns = 'name|20%, categories|20%, desc|20%, sort|20%';
ProductTag.register();
