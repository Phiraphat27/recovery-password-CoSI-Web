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
import PublicationsForm from "@/components/publications/form";
import { createPublications, getPublicationsById } from "@/server-action/publications";

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

    const router = useRouter();

    useEffect(() => {
        if (params.slug[0] !== "add" && params.slug[0] !== "edit") {
            router.push("/office/publications");
        }

        async function fetchData() {
            if (params.slug[0] === "edit") {
                const datauser = await getPublicationsById(params.slug[1] ? params.slug[1] : null);
                setDataForm(datauser as any);
            }
        }
        fetchData();
    }, []);

    const handleSave = async () => {
        // console.log(`res: ${JSON.stringify(dataForm)}`)
        await createPublications(dataForm).then((res) => {
            router.push("/office/publications");
        });
    }

    return (
        <div className="max-w-6xl mx-auto">
            <PublicationsForm dataForm={dataForm} setDataForm={setDataForm} />
            <div className="w-full pt-2 flex items-center ">
                    <button onClick={handleSave} className="dark:bg-blue-600 dark:text-white bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    <button onClick={() => {
                        router.push("/office/publications");
                    }} className="dark:bg-gray-600 dark:text-white bg-gray-500 text-white px-4 py-2 rounded-md ml-4">Cancel</button>
                </div>
        </div>
    );
}
