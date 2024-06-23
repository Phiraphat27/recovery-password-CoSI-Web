import { Input } from "@material-tailwind/react"
import { Dispatch, useEffect, useState } from "react"
import ImageUpload from "@/components/ImageUpload";
import Editor from "@/utils/editor/editor";
import { OutputData } from "@editorjs/editorjs";

export default function NewsForm(
    {
        lang,
        dataForm,
        setDataForm
    }
        :
        {
            lang: string,
            dataForm: any,
            setDataForm: Dispatch<any>
        }
) {
    const [uploadedImage, setUploadedImage] = useState<{ file: File | null, src: string | null }>({ file: null, src: null });
    const [content, setContent] = useState<any>(null);
    const [defaultContent, setDefaultContent] = useState<OutputData>({} as OutputData)

    const handleImageUpload = (imageFile: File | null, imageSrc: string | null) => {
        setUploadedImage({ file: imageFile, src: imageSrc });
    };

    useEffect(() => {
        setDataForm((prev: any) => {
            return {
                ...prev,
                image: uploadedImage.src,
                imageName: uploadedImage.file?.name
            }
        })
    }, [uploadedImage])

    useEffect(() => {
        setDataForm((prev: any) => {
            return {
                ...prev,
                [lang]: {
                    ...prev[lang],
                    content: content
                }
            }
        })
    }, [content])

    useEffect(() => {
        if (dataForm[lang].content !== undefined && dataForm[lang].content !== null && dataForm[lang].content !== "" && typeof dataForm[lang].content === "string") {
            try {
                setDefaultContent(JSON.parse(dataForm[lang].content));
            } catch (error) {
                // console.log("error", error)
            }
        }
    }, [dataForm]);

    const handOnChangeLang = (e: any) => {
        setDataForm((prev: any) => {
            return {
                ...prev,
                [lang]: {
                    ...prev[lang],
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    return (
        dataForm && (
            <div className="w-full flex justify-center items-center h-fit">
                <div className="flex flex-col w-[70%] gap-4">
                    <div className="w-[80%] self-center relative min-w-[200px] h-10">
                        <Input
                            className="!border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                            placeholder=""
                            id="title"
                            label="Title"
                            name="title"
                            required
                            value={dataForm[lang].title}
                            onChange={handOnChangeLang}
                            autoFocus
                            // onChange={handOnChangeLang}
                            onFocus={(e) => e.target.placeholder = "Title Name"}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    </div>
                    <ImageUpload className="w-[320px] h-[240px] mobile-lg:w-[264px] mobile-lg:h-[510px] lg:w-[480px] lg:h-[280px] my-10 lg:my-0 border-2 border-dashed border-gray-400 rounded-[10px] flex justify-center items-center cursor-pointer"
                        onImageUpload={handleImageUpload}
                        image={dataForm.image} />
                    <Editor data={defaultContent} onChange={setContent} editorblock={`editorjs-container-${lang}`} />
                </div>
            </div>
        ))
}