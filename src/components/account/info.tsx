import { Select, Option, Input, Button, Typography } from "@material-tailwind/react";
export default function AccountInfo() {
    return (
        <div className="w-[90%] xl:w-[70%] m-auto lg:h-[680px] flex items-center flex-col lg:flex-row lg:justify-between z-10 mb-8 mt-8">

            <div className="w-full lg:w-[90%] overflow-y-auto lg:h-[680px] duration-200 ease-in-out pb-2 pl-3 pr-5 mr-5 text-sm ">
                <div className="mb-5 pt-2">
                    {/* <h1 className="text-3xl font-medium pb-4">Asst. Prof. Worawat Choensawat (Ph.D.)</h1> */}
                    {/* <h1 className="text-lg font-medium pt-2 text-gray-600">On Member Since :  10 Jul 2020</h1>
                    <h1 className="text-md font-normal text-gray-600">Professor</h1> */}
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className={`peer w-full h-full bg-transparent text-md text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                            placeholder=""
                            id="namee"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            // onChange={(e) => setValues({ ...values, email: e.target.value })}
                            onFocus={(e) => e.target.placeholder = "Your Name"}
                            onBlur={(e) => e.target.placeholder = ""}
                        />
                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                            {"Full Name"}
                        </label>
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
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className={`peer w-full h-full bg-transparent text-md text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                                    placeholder=""
                                    id="github"
                                    name="github"
                                    type="github"
                                    required
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    onFocus={(e) => e.target.placeholder = "Your ID"}
                                    onBlur={(e) => e.target.placeholder = ""}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                                    {"Github ID"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex flex-col items-center gap-4 w-full">
                        <div className="w-full">
                            <div className="relative flex w-full">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    autoComplete="email"
                                    className="pr-20 w-[300px] border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
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
                            {/* <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className={`peer w-full h-full bg-transparent text-md text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                                    placeholder=""
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    onFocus={(e) => e.target.placeholder = "name@example.com"}
                                    onBlur={(e) => e.target.placeholder = ""}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                                    {"Email"}
                                </label>
                            </div> */}
                        </div>
                        <div className="w-full">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className={`peer w-full h-full bg-transparent text-md text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                                    placeholder=""
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    onFocus={(e) => e.target.placeholder = "********"}
                                    onBlur={(e) => e.target.placeholder = ""}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                                    {"Password"}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[220px] h-[340px] mobile-sm:w-[264px] mobile-sm:h-[510px] sm:w-[480px] sm:h-[680px] my-10 lg:my-0">
                <img className="pointer-events-none object-cover object-center w-full h-full rounded-[10px]" src="https://cosi.bu.ac.th/collections/members/C7ZSsXMF9NZO08b.jpg" alt="profile" />
            </div>
        </div>
    )
}