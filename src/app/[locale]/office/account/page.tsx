"use client"
import TabsWithIcon from "@/components/account/table";
import { getUserList } from "@/server-action/user";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function AccountList() {
    const TABLE_HEAD = [
        { label: "Name", key: "name" },
        { label: "Job", key: "job" },
        { label: "Status", key: "online" },
        { label: "Date", key: "date" },
        { label: "Actions", key: null },
    ];

    const [data, setData] = useState([]);
    const localActive = useLocale();

    useEffect(() => {
        async function callData() {
            try {
                const data = await getUserList();
                console.log(data);

                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }

                const newData = data.map((item) => {
                    return {
                        img: "https://cosi.bu.ac.th/collections/members/"+item.user_image,
                        name: item.profile[0].name,
                        email: item.user_email,
                        job: item.position && item.position.position_name && item.position.position_name[0] ? item.position.position_name[0].name : "No Position",
                        org: item.department && item.department.department_name && item.department.department_name[0] ? item.department.department_name[0].name : "No Department",
                        online: true,
                        date: new Date(item.user_join).getTime(),
                    };
                });

                setData(newData as any);
            } catch (error) {
                console.error("Failed to fetch user list:", error);
                setData([]); // Set data to an empty array in case of error
            }
        }

        callData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <TabsWithIcon
                TABLE_HEAD={TABLE_HEAD}
                TABLE_ROWS={data}
                title="Account List"
                subtitle="List of all accounts in the system"
                btnAdd={true}
                btnAddName="Add Account"
                btnAddLink="/office/account/add"
            />
        </div>
    );
}
