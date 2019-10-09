/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';

import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import Table from '@ckeditor/ckeditor5-table/src/table';
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import SGSImageBrowser from '../src/SGSImageBrowser/SGSImageBrowser';
import Layout from '../src/Layout/Layout';
// import LayoutToolbar from '../src/Layout/LayoutToolbar';

import '../theme/theme.css';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,
	// UploadAdapter,
	Alignment,
	Autoformat,
	BlockToolbar,

	Bold,
	Italic,
	Strikethrough,
	Underline,
	Subscript,
	Superscript,
	Code,
	RemoveFormat,

	BlockQuote,
	// CKFinder,
	// EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,

	// ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	// Table,
	// TableToolbar

	// CUSTOM PLUGINS
	SGSImageBrowser,
	Layout,
	// LayoutToolbar,

];

// Editor configuration.
BalloonEditor.defaultConfig = {
	blockToolbar: [
		'heading',
		'|',
		'alignment',
		'bulletedList',
		'numberedList',
		// 'imageUpload',
		'blockQuote',
		// 'insertTable',
		'mediaEmbed',
		'SGSImageBrowser',
		'Layout',
		'|',
		'undo',
		'redo'
	],
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'code',
			'removeFormat'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	// layout: {
	// 	toolbar: [
	// 		'imageStyle:full',
	// 		'imageStyle:side',
	// 		'|',
	// 		'imageTextAlternative'
	// 	]
	// },
	heading: {
		options: [ {
			model: 'paragraph',
			title: 'Paragraph',
			class: 'ck-heading_paragraph'
		},
		{
			model: 'heading1',
			view: 'h1',
			title: 'Heading 1',
			class: 'ck-heading_heading1'
		},
		{
			model: 'heading2',
			view: 'h2',
			title: 'Heading 2',
			class: 'ck-heading_heading2'
		},
		{
			model: 'heading3',
			view: 'h3',
			title: 'Heading 3',
			class: 'ck-heading_heading3'
		},
		{
			model: 'heading4',
			view: 'h4',
			title: 'Heading 4',
			class: 'ck-heading_heading4'
		},
		{
			model: 'heading5',
			view: 'h5',
			title: 'Heading 5',
			class: 'ck-heading_heading5'
		},
		{
			model: 'heading6',
			view: 'h6',
			title: 'Heading 6',
			class: 'ck-heading_heading6'
		}
		]
	},
	link: {
		decorators: {
			addTargetToLinks: {
				mode: 'manual',
				label: 'Open in a new tab',
				attributes: {
					target: '_blank',
					rel: 'noopener noreferrer'
				}
			}
		}
	},
	// table: {
	// 	contentToolbar: [
	// 		'tableColumn',
	// 		'tableRow',
	// 		'mergeTableCells'
	// 	]
	// },
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
