"use client";
import AccountInfo from "@/components/account/info";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

export default function TabsCustomAnimation({ params }: { params: { action: string } }) {
    const data = [
        {
            label: "English",
            value: "EN",
            desc: <>
                <AccountInfo lang="en" />
            </>,
        },
        {
            label: "Thai",
            value: "TH",
            desc: <>
                <AccountInfo lang="th" />
            </>,
        }
    ];

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
            </Tabs>
        </div>
    );
}