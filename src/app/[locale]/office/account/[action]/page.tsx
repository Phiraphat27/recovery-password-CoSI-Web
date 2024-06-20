"use client";
import AccountInfo from "@/components/account/info";
import { useRouter } from "@/navigation";
import { getOption } from "@/server-action/option";
import { createUser } from "@/server-action/user";
import { memberProfile } from "@/type/member";
import { OptionAccount } from "@/type/option";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function TabsCustomAnimation({ params }: { params: { action: string } }) {
    const [dataForm, setDataForm] = useState<memberProfile>({
        emailDisplay: "",
        position: "",
        department: "",
        permission: "",
        github: "",
        email: "",
        password: "",
        image: "",
        th: {
            name: "",
            biography: {}
        },
        en: {
            name: "",
            biography: {}
        }
    });

    const router = useRouter();

    const [option, setOption] = useState<OptionAccount>();

    useEffect(() => {
        async function fetchData() {
            const res = await getOption();
            setOption(res);
        }
        fetchData();
    }, []);

    const data = [
        {
            label: "English",
            value: "EN",
            desc: <>
                <AccountInfo action={params.action} option={option as OptionAccount} dataForm={dataForm} setDataForm={setDataForm} lang="en" />
            </>,
        },
        {
            label: "Thai",
            value: "TH",
            desc: <>
                <AccountInfo action={params.action} option={option as OptionAccount} dataForm={dataForm} setDataForm={setDataForm} lang="th" />
            </>,
        }
    ];

    const handleSave = async () => {
        await createUser(dataForm).then((res) => {
            router.push("/office/account");
        });
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Tabs id="custom-animation" value="EN">
                <div className="flex items-center justify-center">
                    <TabsHeader className="dark:bg-white bg-gray-300"
                        indicatorProps={{
                            className: "dark:bg-gray-900/20 dark:shadow-none",
                        }}
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {data.map(({ label, value }) => (
                            <Tab key={value} className="dark:text-gray-700" value={value} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </div>
                <TabsBody
                    animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                    }}
                    className="dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                    {data.map(({ value, desc }) => (
                        <TabPanel className="dark:text-white" key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
                <div className="w-[90%] xl:w-[80%] m-auto pl-6 flex items-center lg:flex-row z-10">
                    <button onClick={handleSave} className="dark:bg-blue-600 dark:text-white bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    <button className="dark:bg-gray-600 dark:text-white bg-gray-500 text-white px-4 py-2 rounded-md ml-4">Cancel</button>
                </div>
            </Tabs>
        </div>
    );
}