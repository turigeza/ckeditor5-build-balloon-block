export default class AllowClassesPlugin {
	constructor( editor ) {
		this.editor = editor;
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend( 'paragraph', {
			allowAttributes: 'class'
		} );

		editor.conversion.attributeToAttribute( {
			model: {
				name: 'paragraph',
				key: 'class',
				values: [ 'big', 'small' ]
			},
			view: {
				big: {
					name: 'figure',
					key: 'class',
					value: [ 'big', 'some-big-table' ]
				},

				small: {
					name: 'figure',
					key: 'class',
					value: [ 'small', 'some-small-paragraph' ]
				}
			}
		} );
	}
}
