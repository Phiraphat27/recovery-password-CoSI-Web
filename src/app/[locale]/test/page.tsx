"use client"

import dynamic from 'next/dynamic'
import { OutputData } from '@editorjs/editorjs'
import { useEffect, useState } from 'react'
import ViewerComponent from '@/utils/editor/viewerComponent'

// Dynamically import Editor component
const Editor = dynamic(() => import('@/utils/editor/editor'), { ssr: false })

const TestPage: React.FC = () => {
    const [data, setData] = useState<OutputData>({} as OutputData)

    return (
        <div className="editor">
            <Editor data={data} onChange={setData} editorblock="editorjs-container" />
            <button
                className="savebtn bg-black rounded-lg text-white p-3 w-24 mt-4 cursor-pointer"
                onClick={() => {
                    alert(JSON.stringify(data))
                }}
            >
                Save
            </button>
            <ViewerComponent data={data} editorblock="editorjs-container-Viewer"/>
        </div>
    )
}

export default TestPage
