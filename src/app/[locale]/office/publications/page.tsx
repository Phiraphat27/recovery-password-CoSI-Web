"use client"
import React, { useEffect, useState } from "react";
import TablePublish from "@/components/publications/table"
import { useLocale } from "next-intl";
import { getNewsList } from "@/server-action/news";
import { getPublicationsList } from "@/server-action/publications";

export default function NewsPublications() {
    const TABLE_HEAD = [
        { label: "Title", key: "title" },
        { label: "Publish", key: "publish"},
        { label: "Date Publish", key: "datePublish" },
        { label: "Dete Edit", key: "dateEdit"},
        { label: "Actions", key: null },
    ];

    const [data, setData] = useState([]);
    const localActive = useLocale();

    useEffect(() => {
        async function callData() {
            const data = await getPublicationsList();

            if (!Array.isArray(data)) {
                throw new Error("Data is not an array");
            }

            setData(data as any);
        }
        callData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <TablePublish
                TABLE_HEAD={TABLE_HEAD}
                TABLE_ROWS={data}
                title="Publications List"
                subtitle="List of all Publications in the system"
                btnAdd={true}
                btnAddName="Add Publications"
                btnAddLink="/office/publications/add"
            />
        </div>
    );
}