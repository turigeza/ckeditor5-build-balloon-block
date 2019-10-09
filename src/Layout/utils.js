import { isWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export function isImageWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'image' ) && isWidget( viewElement );
}

export function getSelectedLayoutWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement ) {
		return viewElement;
	}

	return null;
}
