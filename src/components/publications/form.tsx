import { Input, Textarea } from "@material-tailwind/react";
import { Dispatch } from "react";

export default function PublicationsForm({
    dataForm,
    setDataForm
}: {
    dataForm: any;
    setDataForm: Dispatch<any>;
}) {
    const handOnChange = (e: any) => {
        setDataForm((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div>
            <h1 className=" font-bold pb-4 text-2xl">Publications Form</h1>
            <div className="flex flex-col space-y-4">
                <div className="flex gap-3">
                    <Input
                        className=" max-w-xl !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                        placeholder=""
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        required
                        value={dataForm.title}
                        onChange={handOnChange}
                        autoFocus
                        onFocus={(e) => e.target.placeholder = "Your title"}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Input
                        className=" max-w-xl !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                        placeholder=""
                        id="link"
                        label="Link"
                        name="link"
                        autoComplete="link"
                        required
                        value={dataForm.link}
                        onChange={handOnChange}
                        onFocus={(e) => e.target.placeholder = "Your link"}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
                <div className="flex gap-3">
                    <Input
                        className=" max-w-xl !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                        placeholder=""
                        id="authors"
                        label="Authors"
                        name="authors"
                        required
                        value={dataForm.authors}
                        onChange={handOnChange}
                        onFocus={(e) => e.target.placeholder = "Your authors"}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Input
                        className=" max-w-xl !border-t-gray-100 dark:border-t-gray-50 dark:focus:border-gray-200 dark:focus:border-t-transparent "
                        placeholder=""
                        id="keyworlds"
                        label="Keyworlds"
                        name="keyworlds"
                        required
                        value={dataForm.keyworlds}
                        onChange={handOnChange}
                        onFocus={(e) => e.target.placeholder = "Your keyworlds"}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
                <div className="relative w-full min-w-[200px]">
                    <textarea
                        value={dataForm.abstract}
                        name="abstract"
                        onChange={handOnChange}
                        rows={12}
                        required
                        className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-gray-50"
                        placeholder=" "></textarea>
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                        Abstract
                    </label>
                </div>
            </div>
        </div>
    );
}