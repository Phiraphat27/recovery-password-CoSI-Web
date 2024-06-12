'use client';
// import { selectLanguage } from "@/store/features/navBerSlice";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getDictionary } from "@/lang/dictionary";
import { useTranslations } from "next-intl";
const useDictionary = (category:string) => {
    const t = useTranslations(category);
    return t;
    // const _lang = useSelector(selectLanguage);
    // const [lang, setLang] = useState<any>();
    // useEffect(() => {
    //     const feallback = async () => {
    //         const lang = await getDictionary(_lang.lang.toLowerCase() || "en") as any;
    //         return lang;
    //     }

    //     feallback().then((lang) => {
    //         setLang(lang);
    //     });
    // }, [_lang]);

    // return lang;
}

export { useDictionary };