import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import customHtmlIcon from './theme/icons/custom_html.svg';

import InsertCustomHtmlCommand from './insertcustomhtmlcommand';

import {
	toWidget
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import './theme/customhtml.css';

export default class CustomHtml extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		const editor = this.editor;

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertCustomHtml', new InsertCustomHtmlCommand( this.editor ) );

		editor.ui.componentFactory.add( 'CustomHtml', locale => {
			const buttonView = new ButtonView( locale );
			buttonView.set( {
				label: 'Custom Html',
				icon: customHtmlIcon,
				tooltip: true
			} );

			buttonView.on( 'execute', () => {
				editor.execute( 'insertCustomHtml', 'customHtml' );
			} );

			const insertCustomHtmlCommand = editor.commands.get( 'insertCustomHtml' );
			buttonView.bind( 'isEnabled' ).to( insertCustomHtmlCommand, 'isEnabled' );

			return buttonView;
		} );
	}

	static get pluginName() {
		return 'CustomHtml';
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'customHtml', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allow in places where other blocks are allowed (e.g. directly in the root).
			inheritAllFrom: '$block',
			// allowAttributes: [ 'alt', 'src', 'srcset' ]
		} );

		// 	schema.register( layout.model, {
		// 		// Cannot be split or left by the caret.
		// 		isLimit: false,
		// 		allowIn: [ 'layout_12', 'layout_48', 'layout_66', 'layout_84', 'layout_444', 'layout_3333' ],
		// 		allowContentOf: '$root'
		// 	} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// customHtml converters
		conversion.for( 'upcast' ).elementToElement( {
			model: 'customHtml',
			view: {
				name: 'div',
				classes: 'custom-html',
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'customHtml',
			view: {
				name: 'div',
				classes: 'custom-html',
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'customHtml',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createContainerElement( 'div', {
					class: 'custom-html'
				} );
				return toWidget( div, viewWriter, {
					label: 'CustomHtml'
				} );
			}
		} );
	}
}
