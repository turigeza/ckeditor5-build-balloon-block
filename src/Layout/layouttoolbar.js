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
		const editor = this.editor;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

		widgetToolbarRepository.register( 'layout', {
			ariaLabel: 'Layout toolbar',
			items: editor.config.get( 'layout.toolbar' ) || [],
			getRelatedElement: getSelectedLayoutWidget,
		} );
	}
}
