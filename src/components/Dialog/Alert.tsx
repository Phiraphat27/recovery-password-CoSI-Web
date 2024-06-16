// components/DialogCustomAnimation.tsx

import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function DialogCustomAnimation({ open = { status: false, message: "" } , setOpen, info }: {
    open?:{
        status: boolean;
        message: string;
    }, info?: string, setOpen: Dispatch<SetStateAction<{
        status: boolean;
        message: string;
    }>>
}) {

    const handleOpen = () => setOpen({ status: false, message: "" });

    return (
        <>
            <Dialog
                open={open.status}
                size="xs"
                className="dark:bg-black dark:text-gray-200 border dark:border-gray-200"
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>simple dialog.</DialogHeader>
                <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {info}
                </DialogBody>
                <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {/* <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        <span>Cancel</span>
                    </Button> */}
                    <Button variant="gradient" color="green" onClick={handleOpen} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
