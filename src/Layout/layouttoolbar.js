import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
	getSelectedLayoutWidget
} from './utils';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';

export default class LayoutToolbar extends Plugin {
	static get requires() {
		return [ WidgetToolbarRepository ];
	}

	static get pluginName() {
		return 'LayoutToolbar';
	}

	afterInit() {
		console.log( 'afterInitafterInit' );

		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

		console.log( editor.config.get( 'layout.toolbar' ) );
		widgetToolbarRepository.register( 'layout', {
			ariaLabel: 'Layout toolbar',
			items: editor.config.get( 'layout.toolbar' ) || [],
			getRelatedElement: getSelectedLayoutWidget,
		} );
	}
}
