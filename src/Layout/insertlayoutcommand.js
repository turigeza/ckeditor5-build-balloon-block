import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertLayoutCommand extends Command {
	execute( layout ) {
		this.editor.model.change( writer => {
			// Insert <div class="layout">*</div> at the current selection position
			// in a way that will result in creating a valid model structure.
			let columns = '';

			switch ( layout ) {
				case 'layout_12':
					columns = [
						{ classes: 'cl_12' },
					];
					break;
				case 'layout_66':
					columns = [
						{ classes: 'cl_6' },
						{ classes: 'cl_6' },
					];
					break;
				case 'layout_444':
					columns = [
						{ classes: 'cl_4' },
						{ classes: 'cl_4' },
						{ classes: 'cl_4' },
					];
					break;
				case 'layout_3333':
					columns = [
						{ classes: 'cl_3' },
						{ classes: 'cl_3' },
						{ classes: 'cl_3' },
						{ classes: 'cl_3' },
					];
					break;
				case 'layout_48':
					columns = [
						{ classes: 'cl_4' },
						{ classes: 'cl_8' },
					];
					break;
				case 'layout_84':
					columns = [
						{ classes: 'cl_8' },
						{ classes: 'cl_4' },
					];
					break;
				default:
					throw 'Layout "' + layout + '" is not defined';
			}
			this.editor.model.insertContent( generateLayout( writer, layout, columns ) ); // eslint-disable-line new-cap
		} );
	}

	refresh() {
		// const model = this.editor.model;
		// const selection = model.document.selection;
		// const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'paragraph' );
		// console.log( allowedIn );
		// this.isEnabled = allowedIn !== null;
		// console.log( this.isEnabled );
		this.isEnabled = true;
	}
}

function generateLayout( writer, layout, columns ) {
	const Layout = writer.createElement( layout );
	columns.forEach( ( col, i ) => {
		const LayoutColumn = writer.createElement( col.classes );
		const paragraph = writer.createElement( 'paragraph' );
		const num = i + 1;

		writer.append( LayoutColumn, Layout );
		writer.appendText( 'Column ' + num, paragraph );
		writer.append( paragraph, LayoutColumn );
	} );

	return Layout;
}
