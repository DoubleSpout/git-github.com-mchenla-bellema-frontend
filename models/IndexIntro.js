var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * IndexIntro Model
 * =============
 */

var IndexIntro = new keystone.List('IndexIntro', {
	autokey: { from: 'title', path: 'key', unique: true },
});

IndexIntro.add({
	title:{ type: String, default:''},
	intro :{ type: Types.Textarea, default:''},
	pos: { type: Types.Select, options: 'postion-1, postion-2, postion-3, postion-4', default: 'postion-1'},
	sort:{ type: Number, default:1 },
	publishedDate: { type: Date},
});

IndexIntro.defaultColumns = 'title, pos|20%, sort|20%, publishedDate|20%';
IndexIntro.register();
