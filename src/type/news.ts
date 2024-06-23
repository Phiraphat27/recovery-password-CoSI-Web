export interface News {
    [key: string]: string | object | number | null | boolean | {
        [key: string]: undefined | string;
    };
    id: string;
    image: string;
    imageName: string;
    draft: boolean;
    publish_date: Date | null;
    th: {
        [key: string]: string | object;
        title: string;
        content: string;
    };
    en: {
        [key: string]: string | object;
        title: string;
        content: string;
    };
}