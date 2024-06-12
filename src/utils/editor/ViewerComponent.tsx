import React, { memo, useEffect, useRef } from "react";
import EditorJS, { BlockToolConstructable, OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/utils/editor/tools";

interface EditorProps {
    data: OutputData;
    editorblock: string;
}

const ViewerComponent: React.FC<EditorProps> = ({ data, editorblock }) => {
    const ref = useRef<EditorJS | null>(null);
    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorblock,
                readOnly: true,
                tools: {
                    ...EDITOR_JS_TOOLS,
                },
                tunes: [
                    'variantTune',
                    'alignmentTune'
                ]
            });
            ref.current = editor;
        }

        // add class name to editorjs container

        return () => {
            // if (ref.current && ref.current.destroy) {
            //     ref.current.destroy();
            // }
        };
    }, [editorblock]);

    useEffect(() => {
        const refetch = async () => {
            if (ref.current?.isReady) {
                await ref.current?.blocks?.render(data);
            }
        }
        refetch();
    }, [data]);

    return <article id={`${editorblock}`} className="bg-[#f9f9f9] dark:!bg-black" />;
};

export default ViewerComponent;
