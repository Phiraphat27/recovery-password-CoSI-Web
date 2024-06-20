
import { OutputData } from "@editorjs/editorjs";
import { Select, Option, Input, Button, Typography } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Editor = dynamic(() => import('@/utils/editor/editor'), { ssr: false })
export default function AccountInfo({ lang }: { lang: string }) {
    const [data, setData] = useState<OutputData>({} as OutputData)

    return (
        <div className="w-[90%] xl:w-[80%] m-auto lg:h-[680px] flex items-center flex-col-reverse lg:flex-row lg:justify-between z-10 mb-8 mt-8">
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
                            autoFocus
                            // onChange={(e) => setValues({ ...values, email: e.target.value })}
                            onFocus={(e) => e.target.placeholder = "Your Name"}
                            onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                    </div>
                    <div className="my-4 flex flex-col lg:flex-row items-center gap-4 w-full">
                        <div className="w-full">
                            <Select
                                label="Position"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select
                                label="Department"
                                itemProp="required"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="my-4 flex flex-col lg:flex-row items-center gap-4 w-full">
                        <div className="w-full">
                            <Select
                                label="Permission"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
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
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    onFocus={(e) => e.target.placeholder = "Your ID"}
                                    onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative w-full h-10">
                            <Input
                                className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                placeholder=""
                                id="email-display"
                                name="email-display"
                                label="Email Display"
                                type="email"
                                required
                                // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                onFocus={(e) => e.target.placeholder = "Your email display"}
                                onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
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
                        <div className="w-full">
                            <div className="relative w-full min-w-[200px] h-10">
                                <Input
                                    className="w-[300px] !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                                    placeholder=""
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    onFocus={(e) => e.target.placeholder = "********"}
                                    onBlur={(e) => e.target.placeholder = ""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}/>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="editor">
                                <div className="text-lg font-medium text-gray-600 pb-2">Biography</div>
                                <Editor data={data} onChange={setData} editorblock={`editorjs-container-${lang}`} />
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
            <div className="w-[220px] h-[340px] mobile-lg:w-[264px] mobile-lg:h-[510px] lg:w-[480px] lg:h-[680px] my-10 lg:my-0">
                <img className="pointer-events-none object-cover object-center w-full h-full rounded-[10px]" src="https://cosi.bu.ac.th/collections/members/C7ZSsXMF9NZO08b.jpg" alt="profile" />
            </div>
        </div>
    )
}