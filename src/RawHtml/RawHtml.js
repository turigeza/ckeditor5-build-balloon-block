import { stringify } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import rawHtmlIcon from './theme/icons/raw_html.svg';

import InsertRawHtmlCommand from './insertrawhtmlcommand';

import {
	toWidget
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import './theme/rawhtml.css';

export default class RawHtml extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		const editor = this.editor;

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertRawHtml', new InsertRawHtmlCommand( this.editor ) );

		editor.ui.componentFactory.add( 'RawHtml', locale => {
			const buttonView = new ButtonView( locale );
			buttonView.set( {
				label: 'Raw Html',
				icon: rawHtmlIcon,
				tooltip: true
			} );

			buttonView.on( 'execute', () => {
				editor.execute( 'insertRawHtml', 'rawHtml' );
			} );

			const insertRawHtmlCommand = editor.commands.get( 'insertRawHtml' );
			buttonView.bind( 'isEnabled' ).to( insertRawHtmlCommand, 'isEnabled' );

			return buttonView;
		} );
	}

	static get pluginName() {
		return 'RawHtml';
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'rawHtml', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block', // Do not allow other content inside so the children will not be converted.
			allowAttributes: [ 'htmlContent' ]
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			model: ( viewElement, writer ) => {
				const stringifiedChildren = Array.from( viewElement.getChildren() ).map( child => stringify( child ) ).join( '' );

				return writer.createElement( 'rawHtml', {
					htmlContent: stringifiedChildren
				} );
			},
			view: {
				name: 'div',
				classes: 'raw-html'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'rawHtml',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createUIElement( 'div', {
					class: 'raw-html'
				}, function( domDocument ) {
					const domElement = this.toDomElement( domDocument );

					domElement.innerHTML = modelElement.getAttribute( 'htmlContent' );

					return domElement;
				} );

				return div;
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'rawHtml',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createUIElement( 'div', { class: 'raw-html' }, function( domDocument ) {
					const domElement = this.toDomElement( domDocument );

					domElement.innerHTML = modelElement.getAttribute( 'htmlContent' );

					return domElement;
				} );

				return toWidget( div, viewWriter, {
					label: 'RawHtml'
				} );
			}
		} );
	}
}
