import React, { memo, useEffect, useRef } from "react";
import EditorJS, { BlockToolConstructable, OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/utils/editor/tools";
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';
// @ts-ignore
import Undo from 'editorjs-undo';

interface EditorProps {
    data: OutputData;
    onChange: (data: OutputData) => void;
    editorblock: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, editorblock }) => {
    const INITIAL_DATA: OutputData = {
        time: new Date().getTime(),
        blocks: [
            // {
            //     type: 'header',
            //     data: {
            //         text: 'This is my awesome editor!',
            //         level: 1,
            //     },
            // },
            // {
            //     type: 'paragraph',
            //     data: {
            //         text: 'Start writing your content here...',
            //     },
            // },
        ],
    }

    const ref = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!ref.current) {
            console.log('date blocks', data);
            const editor = new EditorJS({
                holder: editorblock,
                autofocus: true,
                tools: {
                    ...EDITOR_JS_TOOLS,
                },
                tunes: [
                    'variantTune',
                    'alignmentTune'
                ],
                data: data,
                onReady: () => {
                    new DragDrop(editor);
                    new Undo({ editor });
                },
                async onChange(api, event) {
                    const savedData = await api.saver.save();
                    onChange(savedData);
                },
            });
            ref.current = editor;
        }

        // add class name to editorjs container

        return () => {
            // if (ref.current && ref.current.destroy) {
            //     ref.current.destroy();
            // }
        };
    }, [data, editorblock, onChange]);

    useEffect(() => {
        if (ref.current) {
            ref.current.isReady.then(() => {
                ref.current?.render(data);
            });
        }
    }, [data]);

    return <article id={`${editorblock}`} className="bg-[#f9f9f9] dark:bg-black pt-3" />;
};

export default memo(Editor);
