"use client";

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    TabPanel,
    Tab,
} from "@material-tailwind/react";
import { News } from "@/type/news";
import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import NewsForm from "@/components/news/form";
import { createAndUpdateNews, getNewsById } from "@/server-action/news";

export default function SimpleRegistrationForm({ params }: { params: { slug: any; } }) {
    const [dataForm, setDataForm] = useState<News>({
        id: "",
        image: "",
        imageName: "",
        draft: true,
        updated_at: null,
        publish_date: null,
        th: {
            title: "",
            content: "",
        },
        en: {
            title: "",
            content: "",
        }
    });
    
    const data = [
        {
            label: "English",
            value: "EN",
            desc: <>
                <NewsForm dataForm={dataForm} setDataForm={setDataForm} lang="en" />
            </>,
        },
        {
            label: "Thai",
            value: "TH",
            desc: <>
                <NewsForm dataForm={dataForm} setDataForm={setDataForm} lang="th" />
            </>,
        }
    ];

    const router = useRouter();

    useEffect(() => {
        if (params.slug[0] !== "add" && params.slug[0] !== "edit") {
            router.push("/office/account");
        }

        async function fetchData() {
            if (params.slug[0] === "edit") {
                const datauser = await getNewsById(params.slug[1] ? params.slug[1] : null);
                setDataForm(datauser as unknown as News);
            }
        }
        fetchData();
    }, []);

    const handleSave = async () => {
        // console.log(`res: ${JSON.stringify(dataForm)}`)
        await createAndUpdateNews(dataForm).then((res) => {
            router.push("/office/news");
        });
    }

    return (
        <div className="max-w-6xl mx-auto">
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
                <div className="w-full flex items-center ">
                    <button onClick={handleSave} className="dark:bg-blue-600 dark:text-white bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    <button onClick={() => {
                        router.push("/office/news");
                    }} className="dark:bg-gray-600 dark:text-white bg-gray-500 text-white px-4 py-2 rounded-md ml-4">Cancel</button>
                </div>
            </Tabs>
        </div>
    );
}
