"use client"
import { useDictionary } from "@/lang/useDictionary";
import { login } from "@/lib/auth";
import { handleLogin } from "@/lib/serverActions";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import Alert from "@/components/Dialog/Alert";

export default function SignIn() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const Dict = useDictionary("signIn");

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
      setIsDarkMode(e.matches);
    });
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleLogin(formData).then((data: any) => {
      console.log(data);
      
      if (data && data.data.Error) {
        setError({
          ...error,
          status: true,
          message: data.data.Error
        });
      }
    })
  };

  return (
    <>
      <Alert open={error} setOpen={setError} info={error.message} />
      <div className="flex min-h-full h-svh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="border border-gray-500 dark:border-gray-300 rounded-lg p-6 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={`${!isDarkMode ? "images/Logo-Name-Bold_Gray-H.png" : "images/Logo-Name-Bold_Light-H.png"}`}
              alt="CoSI"
            />
            <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-white">
              {Dict("HeadSignIn")}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className={`peer w-full h-full bg-transparent text-md text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 ${values.email.length > 0 && "border-t-transparent"} focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                      placeholder=" "
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      onFocus={(e) => e.target.placeholder = "name@mail.com"}
                      onBlur={(e) => e.target.placeholder = ""}
                    />
                    <label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                      {Dict("email")}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className={`peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 ${values.password.length > 0 && "border-t-transparent"} focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-200 dark:focus:border-t-transparent`}
                      placeholder=" "
                      onChange={(e) => setValues({ ...values, password: e.target.value })}
                      onFocus={(e) => e.target.placeholder = "********"}
                      onBlur={(e) => e.target.placeholder = ""}
                    />
                    <label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-600 dark:text-gray-200 peer-focus:text-gray-900 dark:peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-200 after:border-blue-gray-200 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-200">
                      {Dict("password")}
                    </label>
                  </div>
                  <p className="flex items-center gap-[0.6rem] mt-2 font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                      <path fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"></path>
                    </svg>
                    {Dict("passwordInfo")}
                  </p>
                </div>
              </div>

              <div className="flex justify-between flex-col items-start">
                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-3 -mt-5 rounded-full cursor-pointer" htmlFor="description">
                    <input type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                      id="description" />
                    <span
                      className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </label>
                  <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="description">
                    <div>
                      <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900 dark:text-gray-200">
                        {Dict("rememberMe")}
                      </p>
                      <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                        {Dict("rememberMeInfo")}
                      </p>
                    </div>
                  </label>
                </div>
                <div className="text-sm pt-6">
                  <a href="#" className="font-semibold text-[#5e5e5e] hover:text-[#767676] dark:text-gray-100">
                    {Dict("forgotPassword")}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#5e5e5e] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#767676] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e5e5e]"
                >
                  {Dict("signIn")}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-[#777777]">
              {Dict("notMember")}{' '}
              <a href="#" className="font-semibold leading-6 text-[#4b4b4b] hover:text-[#767676] dark:text-gray-200">
                {Dict("joinCosi")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
