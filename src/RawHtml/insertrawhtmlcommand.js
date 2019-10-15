import Command from '@ckeditor/ckeditor5-core/src/command';

export default class rawHtmlCommand extends Command {
	execute( ) {
		this.editor.model.change( writer => {
			const rawHtmlElement = writer.createElement( 'rawHtml' );
			this.editor.model.insertContent( rawHtmlElement ); // eslint-disable-line new-cap
		} );
	}

	refresh() {
		this.isEnabled = true;
	}
}
