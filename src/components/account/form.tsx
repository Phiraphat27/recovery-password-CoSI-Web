
import { OutputData } from "@editorjs/editorjs";
import { Select, Option, Input, Button, Typography } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { Dispatch, useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { OptionAccount } from "@/type/option";
const Editor = dynamic(() => import('@/utils/editor/editor'), { ssr: false })
export default function AccountInfo(
    {
        lang,
        action,
        option,
        dataForm,
        setDataForm
    }:
        {
            lang: string,
            action: string,
            option: OptionAccount,
            dataForm: any,
            setDataForm: Dispatch<any>
        }
) {
    const [biography, setBiography] = useState<OutputData>({} as OutputData)
    const [defaultBiography, setDefaultBiography] = useState<OutputData>({} as OutputData)
    const [uploadedImage, setUploadedImage] = useState<{ file: File | null, src: string | null }>({ file: null, src: null });

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
                    biography: biography
                }
            }
        })
    }, [biography])

    const handOnChangeLang = (e: any, name?: string, value?: any) => {
        const key = name ? name : e.target.name
        const val = value ? value : e.target.value
        setDataForm((prev: any) => {
            // if type if input
            return {
                ...prev,
                [lang]: {
                    ...prev[lang],
                    [key]: val
                }
            }
        })
    }

    const handOnChange = (e: any, name?: string, value?: any) => {
        const key = name ? name : e.target.name
        const val = value ? value : e.target.value
        setDataForm((prev: any) => {
            return {
                ...prev,
                [key as string]: val
            }
        }
        )
    }

    useEffect(() => {
        if (dataForm[lang].biography !== undefined && dataForm[lang].biography !== null && dataForm[lang].biography !== "" && typeof dataForm[lang].biography === "string") {
            try {
                setDefaultBiography(JSON.parse(dataForm[lang].biography));
            } catch (error) {
                // console.log("error", error)
            }
        }
    }, [dataForm]);

    return (
        dataForm && (
            <div className="w-[90%] xl:w-[80%] m-auto lg:h-[680px] flex items-center flex-col-reverse lg:flex-row lg:justify-between z-10 mb-0 mt-8">
                <div className="w-full lg:w-[90%] overflow-y-auto lg:h-[680px] duration-200 ease-in-out pb-2 pl-3 pr-5 mr-5 text-sm ">
                    <div className="mb-5 pt-3">
                        {/* <h1 className="text-3xl font-medium pb-4">Asst. Prof. Worawat Choensawat (Ph.D.)</h1> */}
                        {/* <h1 className="text-lg font-medium pt-2 text-gray-600">On Member Since :  10 Jul 2020</h1>
                    <h1 className="text-md font-normal text-gray-600">Professor</h1> */}
                        <div className="relative w-full min-w-[200px] h-10">
                            <Input
                                className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                placeholder=""
                                id="namee"
                                label="Full Name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                value={dataForm[lang].name}
                                autoFocus
                                onChange={handOnChangeLang}
                                onFocus={(e) => e.target.placeholder = "Your Name"}
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                        </div>
                        <div className="my-4 flex flex-col lg:flex-row items-center gap-4 w-full">
                            <div className="w-full">
                                {option && option.position && (
                                    <Select
                                        name="position"
                                        label="Position"
                                        value={dataForm.position}
                                        onChange={(value) => handOnChange(undefined, "position", value)}
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {option.position.map((item, index) => (
                                            <Option key={index} value={item.value}>
                                                {item.label && item.label[lang] && item.label[lang].name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                            <div className="w-full">
                                {option && option.department && (
                                    <Select
                                        name="department"
                                        label="Department"
                                        value={dataForm.department}
                                        onChange={(value) => handOnChange(undefined, "department", value)}
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {option.department.map((item, index) => (
                                            <Option key={index} value={item.value}>
                                                {item.label && item.label[lang] && item.label[lang].name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </div>
                        <div className="my-4 flex flex-col lg:flex-row items-center gap-4 w-full">
                            <div className="w-full">
                                {option && option.department && (
                                    <Select
                                        name="permission"
                                        label="Permission"
                                        value={dataForm.permission}
                                        onChange={(value) => handOnChange(undefined, "permission", value)}
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {option.permission.map((item, index) => (
                                            <Option key={index} value={item.value}>
                                                {item.label && item.label[lang] && item.label[lang].name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                            <div className="w-full">
                                <div className="relative w-full h-10">
                                    <Input
                                        className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                        placeholder=""
                                        id="github"
                                        name="github"
                                        type="github"
                                        label="Github ID"
                                        value={dataForm.github}
                                        onChange={handOnChange}
                                        onFocus={(e) => e.target.placeholder = "Your ID"}
                                        onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="relative w-full h-10">
                                <Input
                                    className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                    placeholder=""
                                    id="email-display"
                                    name="emailDisplay"
                                    label="Email Display"
                                    value={dataForm.emailDisplay}
                                    type="email"
                                    required
                                    onChange={handOnChange}
                                    onFocus={(e) => e.target.placeholder = "Your email display"}
                                    onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                            </div>
                        </div>
                        <div className="my-4 flex flex-col items-center gap-4 w-full">
                            <div className="w-full">
                                <div className="relative flex w-full">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email System"
                                        autoComplete="email"
                                        value={dataForm.email.split("@")[0]}
                                        onChange={handOnChange}
                                        required
                                        className="pr-20 w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                        labelProps={{ className: "dark:text-gray-200 dark:peer-focus:text-white dark:peer-focus:before:!border-gray-200 dark:peer-focus:after:!border-gray-200" }}
                                        containerProps={{ className: "min-w-0 dark:text-white" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}
                                    />

                                    <Typography
                                        as="p"
                                        // id={`edit-${item.unit}-button`}
                                        color="gray"
                                        // onClick={(e) => handEdit(item.unit, e)}
                                        className="!absolute font-semibold text-sm right-1 top-1 mt-1 mr-1 rounded dark:!bg-white dark:!text-black" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        @cosi.bu.ac.th
                                    </Typography>
                                </div>
                            </div>
                            {/* <div className={`w-full ${action !== "edit" ? "hidden" : ""}`}>
                                <div className="relative w-full min-w-[200px] h-10">
                                    <Input
                                        className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                        placeholder=""
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={dataForm.password}
                                        autoComplete="password"
                                        disabled={action !== "edit" ? true : false}
                                        onChange={handOnChange}
                                        onFocus={(e) => e.target.placeholder = "********"}
                                        onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                </div>
                            </div> */}
                            <div className="w-full">
                                <div className="editor">
                                    <div className="text-lg font-medium text-gray-600 pb-2">Biography</div>
                                    <Editor data={defaultBiography} onChange={setBiography} editorblock={`editorjs-container-${lang}`} />
                                    {/* <button
                                    className="savebtn bg-black rounded-lg text-white p-3 w-24 mt-4 cursor-pointer"
                                    onClick={() => {
                                        alert(JSON.stringify(data))
                                    }}
                                >
                                    Save
                                </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ImageUpload className="w-[220px] h-[340px] mobile-lg:w-[264px] mobile-lg:h-[510px] lg:w-[380px] lg:h-[680px] my-10 lg:my-0 border-2 border-dashed border-gray-400 rounded-[10px] flex justify-center items-center cursor-pointer"
                    onImageUpload={handleImageUpload}
                    image={dataForm.image} />
                {/* <div className="w-[220px] h-[340px] mobile-lg:w-[264px] mobile-lg:h-[510px] lg:w-[480px] lg:h-[680px] my-10 lg:my-0">
                <img className="pointer-events-none object-cover object-center w-full h-full rounded-[10px]" src="https://cosi.bu.ac.th/collections/members/C7ZSsXMF9NZO08b.jpg" alt="profile" />
            </div> */}
            </div>
        )
    )
}