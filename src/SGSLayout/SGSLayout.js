import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import layoutIcon111 from './theme/icons/layout-1-1-1-1.svg';
import InsertSGSLayoutCommand from './insertsgslayoutcommand';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

export default class SGSLayout extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		const editor = this.editor;
		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add( 'insertSGSLayout', new InsertSGSLayoutCommand( this.editor ) );

		editor.ui.componentFactory.add( 'SGSLayout', locale => {
			const view = new ButtonView( locale );
			const command = editor.commands.get( 'insertSGSLayout' );

			view.set( {
				label: 'Insert Layout',
				icon: layoutIcon111,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				editor.execute( 'insertSGSLayout' );
			} );

			// this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimpleBox' ) ); an other way of listening to clicks : )

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			return view;
		} );
	}

	static get pluginName() {
		return 'SGSLayout';
	}

	_defineSchema() { // ADDED
		const schema = this.editor.model.schema;

		schema.register( 'SGSLayout', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		} );

		schema.register( 'SGSLayoutColumn', {
			// Cannot be split or left by the caret.
			isLimit: true,
			allowIn: 'SGSLayout',

			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'SGSLayoutColumn' ) && childDefinition.name == 'SGSLayout' ) {
				return false;
			}
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// <SGSLayout> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'SGSLayout',
			view: {
				name: 'div',
				classes: 'sgs-layout'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'SGSLayout',
			view: {
				name: 'div',
				classes: 'sgs-layout'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'SGSLayout',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createContainerElement( 'div', { class: 'sgs-layout' } );
				return toWidget( div, viewWriter, { label: 'SGS Layout' } );
			}
		} );

		// OLD WAY
		// conversion.elementToElement( {
		// 	model: 'SGSLayout',
		// 	view: {
		// 		name: 'div',
		// 		classes: 'sgs-layout'
		// 	}
		// } );

		// <SGSLayoutColumn> converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'SGSLayoutColumn',
			view: {
				name: 'div',
				classes: 'sgs-layout-column'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'SGSLayoutColumn',
			view: {
				name: 'div',
				classes: 'sgs-layout-column'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'SGSLayoutColumn',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const column = viewWriter.createEditableElement( 'div', { class: 'sgs-layout-column' } );
				return toWidgetEditable( column, viewWriter );
			}
		} );

		// OLD WAY
		// conversion.elementToElement( {
		// 	model: 'SGSLayoutColumn',
		// 	view: {
		// 		name: 'div',
		// 		classes: 'sgs-layout-column'
		// 	}
		// } );
	}
}
