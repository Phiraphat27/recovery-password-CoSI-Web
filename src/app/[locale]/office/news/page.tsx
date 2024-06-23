"use client"
import React, { useEffect, useState } from "react";
import TableNews from "@/components/news/table"
import { useLocale } from "next-intl";
import { getNewsList } from "@/server-action/news";

export default function NewsList() {
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
            const data = await getNewsList();

            if (!Array.isArray(data)) {
                throw new Error("Data is not an array");
            }

            const newData = data.map((item) => {
                return {
                    title: item.news_content.filter((item: any) => item.language_code === localActive)[0].title,
                    datePublish: item.publish_date ? new Date(item.publish_date).getTime() : null,
                    dateEdit: item.edit_date ? new Date(item.edit_date).getTime() : null,
                    publish: !item.news_draft,
                    id: item.news_id,
                };
            });

            setData(newData as any);
        }
        callData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <TableNews
                TABLE_HEAD={TABLE_HEAD}
                TABLE_ROWS={data}
                title="News List"
                subtitle="List of all News in the system"
                btnAdd={true}
                btnAddName="Add News"
                btnAddLink="/office/news/add"
            />
        </div>
    );
}