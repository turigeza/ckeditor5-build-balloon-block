import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import layout_icon_3333 from './theme/icons/layout_3333.svg';

import InsertCustomHtmlCommand from './insertcustomhtmlcommand';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import './theme/layout.css';

export default class Layout extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		const editor = this.editor;

		this._defineSchema();
		this._defineConverters();
		this.editor.commands.add( 'insertCustomHtml', new InsertCustomHtmlCommand( this.editor ) );

		editor.ui.componentFactory.add( 'Layout', locale => {
			// create dropdown
			const dropdownView = createDropdown( locale );

			// Add buttons to dropdown.
			const buttons = [];

			this._layouts.forEach( layout => {
				const button = new ButtonView( locale );
				button.set( {
					label: layout.label,
					icon: layout.icon,
					tooltip: true
				} );

				button.on( 'execute', () => {
					editor.execute( 'insertLayout', layout.model );
				} );

				// button.bind( 'isOn', 'isEnabled' ).to( layoutIcon11Command, 'value', 'isEnabled' );
				buttons.push( button );
			} );

			addToolbarToDropdown( dropdownView, buttons );
			dropdownView.toolbarView.isVertical = true;
			dropdownView.toolbarView.ariaLabel = 'Layout toolbar';
			dropdownView.extendTemplate( {
				attributes: {
					class: 'layout-dropdown'
				}
			} );
			dropdownView.buttonView.set( {
				label: 'Layout',
				tooltip: true,
				icon: layout_icon_3333
			} );

			const insertLayoutCommand = editor.commands.get( 'insertLayout' );
			dropdownView.bind( 'isEnabled' ).to( insertLayoutCommand, 'isEnabled' );

			return dropdownView;
		} );
	}

	static get pluginName() {
		return 'Layout';
	}

	_defineSchema() { // ADDED
		const schema = this.editor.model.schema;
		this._layouts.forEach( layout => {
			schema.register( layout.model, {
				// Behaves like a self-contained object (e.g. an image).
				isObject: true,
				// Allow in places where other blocks are allowed (e.g. directly in the root).
				allowWhere: '$block',
				// allowAttributes: [ 'alt', 'src', 'srcset' ]
			} );
		} );
		this._columns.forEach( layout => {
			schema.register( layout.model, {
				// Cannot be split or left by the caret.
				isLimit: false,
				allowIn: [ 'layout_12', 'layout_48', 'layout_66', 'layout_84', 'layout_444', 'layout_3333' ],
				allowContentOf: '$root'
			} );
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// layout converters
		this._layouts.forEach( layout => {
			conversion.for( 'upcast' ).elementToElement( {
				model: layout.model,
				view: {
					name: 'div',
					classes: layout.classes
				}
			} );
			conversion.for( 'dataDowncast' ).elementToElement( {
				model: 'layout',
				view: {
					name: 'div',
					classes: layout.classes
				}
			} );
			conversion.for( 'editingDowncast' ).elementToElement( {
				model: layout.model,
				view: ( modelElement, viewWriter ) => {
					const div = viewWriter.createContainerElement( 'div', { class: layout.classes.join( ' ' ) } );
					return toWidget( div, viewWriter, { label: 'Layout' } );
				}
			} );
		} );

		// column converters
		this._columns.forEach( layout => {
			conversion.for( 'upcast' ).elementToElement( {
				model: layout.model,
				view: {
					name: 'div',
					classes: layout.model
				}
			} );
			conversion.for( 'dataDowncast' ).elementToElement( {
				model: 'layout',
				view: {
					name: 'div',
					classes: layout.model
				}
			} );
			conversion.for( 'editingDowncast' ).elementToElement( {
				model: layout.model,
				view: ( modelElement, viewWriter ) => {
					const column = viewWriter.createEditableElement( 'div', { class: layout.model } );
					return toWidgetEditable( column, viewWriter );
				}
			} );
		} );
	}
}
