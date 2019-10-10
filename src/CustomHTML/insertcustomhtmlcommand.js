import Command from '@ckeditor/ckeditor5-core/src/command';

export default class customHtmlCommand extends Command {
	execute( ) {
		this.editor.model.change( writer => {
			const customHtmlElement = writer.createElement( 'customHtml' );
			this.editor.model.insertContent( customHtmlElement ); // eslint-disable-line new-cap
		} );
	}

	refresh() {
		this.isEnabled = true;
	}
}
