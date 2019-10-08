import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSGSLayoutCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			// Insert <div class="sgs-layout">*</div> at the current selection position
			// in a way that will result in creating a valid model structure.
			this.editor.model.insertContent( SGSLayout( writer ) ); // eslint-disable-line new-cap
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'SGSLayout' );

		this.isEnabled = allowedIn !== null;
	}
}

function SGSLayout( writer ) {
	const SGSLayout = writer.createElement( 'SGSLayout' );
	const SGSLayoutColumn = writer.createElement( 'SGSLayoutColumn' );
	const SGSLayoutColumn2 = writer.createElement( 'SGSLayoutColumn' );

	writer.append( SGSLayoutColumn, SGSLayout );
	writer.append( SGSLayoutColumn2, SGSLayout );

	// There must be at least one paragraph for the description to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement( 'paragraph', SGSLayoutColumn );
	writer.appendElement( 'paragraph', SGSLayoutColumn2 );

	// // Callback executed once the image is clicked.
	// view.on( 'execute', () => {
	//     const imageUrl = prompt( 'Image URL' ); // eslint-disable-line no-alert
	//
	//     editor.model.change( writer => {
	//         const imageElement = writer.createElement( 'image', {
	//             src: imageUrl
	//         } );
	//
	//         // Insert the image in the current selection location.
	//         editor.model.insertContent( imageElement, editor.model.document.selection );
	//     } );
	// } );
	return SGSLayout;
}
