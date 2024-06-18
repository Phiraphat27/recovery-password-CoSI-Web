import { editTwoauth, getAppAuth, getTwoauth } from "@/server-action/setting";
import { TwoFactorData } from "@/type/two-factor";
import { Button, Input, Switch } from "@material-tailwind/react";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/loading";

const TwoFactor: React.FC = () => {
    const [listTwoFactor, setListTwoFactor] = useState<Array<{ title: string; description: string; status: string; unit: string }>>(
        [
            {
                title: "Recovery email",
                description: "Add a recovery email to secure your account.",
                status: "Not configured",
                unit: "email"
            },
            {
                title: "Authenticator App",
                description: "Generate time-based one-time passwords (TOTPs) for authentication.",
                status: "Not configured",
                unit: "auth_app"
            },
        ]
    );

    const [dataTwoFactor, setDataTwoFactor] = useState<TwoFactorData>({} as TwoFactorData);
    useEffect(() => {
        const fetchData = async () => {
            const response: TwoFactorData = await getTwoauth();
            const redata = listTwoFactor.map((item) => {
                item.status = response[item.unit] ? "Configured" : "Not configured";
                return item;
            });

            setDataTwoFactor(response);
            setListTwoFactor(redata);
        };

        fetchData();
    }, []);

    const handleButton = async (e: React.MouseEvent<HTMLButtonElement>, unit: string) => {
        const layout = document.getElementById(`layout-${unit}`);
        const input = document.getElementById(`${unit}-input`) as HTMLInputElement;
        const button = document.getElementById(`${unit}-button`) as HTMLButtonElement;
        const text = document.getElementById(`text-status-${unit}`);
        const qrCode = document.getElementById("authenticator-qr-code") as HTMLImageElement;

        if (layout && input && button) {
            const isHidden = layout.classList.toggle("hidden");
            text?.style.setProperty("display", isHidden ? "block" : "none");
            button.innerHTML = isHidden ? "Edit" : "Cancel";
            button.style.setProperty("color", isHidden ? "" : "red");
            button.style.setProperty("border-color", isHidden ? "" : "red");

            const input_value = dataTwoFactor[unit] ? dataTwoFactor[unit] : "Not configured";
            input.value = input_value === "Not configured" ? "" : input_value as string;
            if (!isHidden) {
                input.focus();
            }
        }

        if (layout && qrCode && unit === "auth_app") {
            const isHidden = layout.classList.toggle("hidden");
            const haveData = dataTwoFactor.auth_app ? true : false;
            text?.style.setProperty("display", isHidden ? "block" : "none");
            button.innerHTML = isHidden ? !haveData ? "Generate" : "View" : "Cancel";
            button.style.setProperty("color", isHidden ? "" : "red");
            button.style.setProperty("border-color", isHidden ? "" : "red");

            const image = await getAppAuth();
            qrCode.src = decodeURIComponent(image);

            listTwoFactor.map((item) => {
                item.status = item.unit === unit ? "Configured" : image;
                return item;
            });
        }
    };

    const handEdit = async (unit: string, e?: React.MouseEvent<HTMLButtonElement>) => {
        const input = document.getElementById(`${unit}-input`) as HTMLInputElement;
        const layout = document.getElementById(`layout-${unit}`);
        const text = document.getElementById(`text-status-${unit}`);
        const button = document.getElementById(`${unit}-button`) as HTMLButtonElement;
        const switchEnable = document.getElementById("two-factor-switch") as HTMLInputElement;
        const qrCode = document.getElementById("authenticator-qr-code") as HTMLImageElement;

        if (unit === "email") {
            await editTwoauth({
                email: unit === "email" ? input.value : "",
                enable: switchEnable.checked
            }).then(() => {
                const redata = listTwoFactor.map((item) => {
                    item.status = item.unit === unit ? input.value === "" ? "Not configured" : input.value : item.status;
                    return item;
                });
                setListTwoFactor(redata);
                layout?.classList.add("hidden");
                text?.style.setProperty("display", "block");
                button.innerHTML = "Edit";
                button.style.setProperty("color", "");
                button.style.setProperty("border-color", "");
            });
        }
    }

    const handleSwitch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const switchEnable = document.getElementById("two-factor-switch") as HTMLInputElement;
        setDataTwoFactor({ ...dataTwoFactor, enable: switchEnable.checked });
        await editTwoauth({
            enable: switchEnable.checked
        })
    }

    return (
        <div className="w-full items-center">
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-semibold text-lg">Two-factor Authentication</div>
                    <div className="font-medium text-md text-gray-500 dark:text-gray-200">
                        Enable two-factor authentication for your account.
                    </div>
                </div>
                <div className="flex gap-2">
                    <Switch
                        className="h-full w-full checked:bg-[#2ec946] bg-red-600"
                        onChange={handleSwitch}
                        checked={dataTwoFactor.enable}
                        id="two-factor-switch"
                        containerProps={{ className: "w-11 h-6" }}
                        circleProps={{ className: "before:hidden left-0.5 border-none" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
            </div>
            <div className="flex flex-col gap-5 pt-6">
                {listTwoFactor.map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-6 border-b-[2px] border-gray-200">
                        <div>
                            <div className="font-semibold text-md">{item.title}</div>
                            <div className="font-medium text-sm text-gray-500 dark:text-gray-200">
                                {item.description}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div id={`text-status-${item.unit}`} className="font-semibold text-sm text-gray-500 dark:text-gray-200">
                                {item.status}
                            </div>
                            <div id={`layout-${item.unit}`} className="relative w-full max-w-[24rem] hidden">
                                {item.unit !== "auth_app" ? (
                                    <>
                                        <Input
                                            type={item.unit === "phone" ? "tel" : "email"}
                                            id={`${item.unit}-input`}
                                            label={item.unit === "phone" ? "Phone Number" : "Email"}
                                            className="pr-20"
                                            containerProps={{ className: "min-w-0" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                        <Button
                                            size="sm"
                                            id={`edit-${item.unit}-button`}
                                            color="gray"
                                            onClick={(e) => handEdit(item.unit, e)}
                                            className="!absolute right-1 top-1 rounded" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                            Edit
                                        </Button></>
                                ) : (
                                    <>
                                        {/* image base64 */}
                                        <Suspense fallback={<Loading />}>
                                            <Image
                                                src=""
                                                id="authenticator-qr-code"
                                                alt="Authenticator"
                                                width={80}
                                                height={80}
                                                className="rounded" />
                                        </Suspense>
                                    </>
                                )
                                }
                            </div>
                            <Button
                                size="sm"
                                id={`${item.unit}-button`}
                                variant="outlined"
                                className="!overflow-visible"
                                onClick={(e) => handleButton(e, item.unit)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                {item.unit !== "auth_app" ? "Edit" : dataTwoFactor.auth_app ? "View" : "Generate"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwoFactor;
