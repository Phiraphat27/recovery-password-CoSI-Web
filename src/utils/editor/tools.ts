// @ts-ignore
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import Paragraph from '@editorjs/paragraph'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Warning from '@editorjs/warning'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import Raw from '@editorjs/raw'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import CheckList from '@editorjs/checklist'
// @ts-ignore
import Delimiter from '@editorjs/delimiter'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'
// @ts-ignore
import SimpleImage from '@editorjs/simple-image'
// @ts-ignore
import Attaches from '@editorjs/attaches'
// @ts-ignore
import NestedList from '@editorjs/nested-list'
// @ts-ignore
import VariantTune from '@editorjs/text-variant-tune'
// @ts-ignore
import Underline from '@editorjs/underline'
// @ts-ignore
import Cookies from 'js-cookie';
// @ts-ignore
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
// @ts-ignore
import Strikethrough from '@sotaproject/strikethrough';
// @ts-ignore
import ChangeCase from 'editorjs-change-case';
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin';
//@ts-ignore
import editorjsColumns from '@calumk/editorjs-columns';
//@ts-ignore
import Alert from 'editorjs-alert';
//@ts-ignore
import Math from "editorjs-math";
//@ts-ignore
import BreakLine from 'editorjs-break-line';
//@ts-ignore
import YoutubeEmbed from 'editorjs-youtube-embed';

import EditorJS from '@editorjs/editorjs'


export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    math: {
        class: Math,
    },
    breakLine: {
        class: BreakLine,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+ENTER',
    },
    alignmentTune: {
        class: AlignmentTuneTool,
        config: {
            default: "left",
            // blocks: {
            //     header: 'left',
            //     list: 'left'
            // }
        },
    },
    strikethrough: Strikethrough,
    underline: Underline,
    changeCase: {
        class: ChangeCase,
        config: {
            defaultCase: 'lowercase', // or 'uppercase' | 'titlecase' | 'sentencecase'
            showLocaleOption: false, // enable locale case options
        }
    },
    Color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
            customPicker: true // add a button to allow selecting any colour  
        }
    },
    columns: {
        class: editorjsColumns,
        config: {
            EditorJsLibrary: EditorJS, // Pass the library instance to the columns instance.
            tools: {
                header: Header,
                alert: Alert,
                delimiter: Delimiter,
                image: {
                    class: Image,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:4000/image', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:4000/files', // Your endpoint that provides uploading by Url
                        }
                    }
                },
            }
        }
    },
    alert: Alert,
    embed: Embed,
    youtubeEmbed: YoutubeEmbed,
    table: {
        class: Table,
    },
    list: {
        class: NestedList,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    warning: Warning,
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: 'http://localhost:3001/api/v1/fetchUrl', // Your backend endpoint for url data fetching
        }
    },
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://localhost:4000/image', // Your backend file uploader endpoint
                byUrl: 'http://localhost:4000/files', // Your endpoint that provides uploading by Url
            }
        }
    },
    raw: Raw,
    header: Header,
    quote: Quote,
    Marker: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            defaultColor: '#FFBF00',
            type: 'marker',
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
        }
    },
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
    },
    simpleImage: SimpleImage,
    attaches: {
        class: Attaches,
        config: {
            endpoint: 'http://localhost:4000/upload',
            fieldName: 'file',
            types: '*',
            additionalRequestData: {
                csrfToken: Cookies.get('cosi-storage')
            },
            // uploadByFile(file) {
            //     return customUploadMethod(file);
            // },
        }
    },
    variantTune: VariantTune
}