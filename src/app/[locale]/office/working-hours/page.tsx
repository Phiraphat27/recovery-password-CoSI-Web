
"use client"
import TableWorkingHours from "@/components/working-hours/table";
import { getWorkingHoursList } from "@/server-action/working-hours";
import { useEffect, useState } from "react";
export default function WorkingHours() {
    const TABLE_HEAD = [
        { label: "Name", key: "name" },
        { label: "To Day", key: "toDay" },
        { label: "Total Hours", key: "totalHours"},
        { label: "Total Commits", key: "totalCommits"},
        { label: "Actions", key: null },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        async function callData() {
            const data = await getWorkingHoursList();
            console.log(data);

            if (!Array.isArray(data)) {
                throw new Error("Data is not an array");
            }

            setData(data as any);
        }
        callData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <TableWorkingHours
                TABLE_HEAD={TABLE_HEAD}
                TABLE_ROWS={data}
                title="Working Hours List"
                subtitle="List of all Working Hours in the system"
                btnAdd={false}
                btnAddName="Add Working Track"
                btnAddLink="/office/working-hours/add"
            />
        </div>
    );
}