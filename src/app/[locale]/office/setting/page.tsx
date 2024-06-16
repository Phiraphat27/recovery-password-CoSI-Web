"use client";
import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    FingerPrintIcon
} from "@heroicons/react/24/solid";

export function TabsWithIcon() {
    const data = [
        {
            label: "Accounts",
            value: "accounts",
            icon: UserCircleIcon,
            desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
        },
        {
            label: "Two-factor",
            value: "twoFactor",
            icon: FingerPrintIcon,
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Sessions",
            value: "sessions",
            icon: Square3Stack3DIcon,
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];
    return (
        <div className="max-w-7xl mx-auto dark:text-white">
            <Tabs value="dashboard">
                <TabsHeader className=" bg-gray-200 dark:bg-transparent dark:text-white dark:border-white dark:border" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {data.map(({ label, value, icon }) => (
                        <Tab
                            key={value}
                            value={value}
                            className="dark:text-gray-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            >
                            <div className="flex items-center gap-2">
                                {React.createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className="dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {data.map(({ value, desc }) => (
                        <TabPanel className="dark:text-white" key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default TabsWithIcon;
