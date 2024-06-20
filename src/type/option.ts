export interface OptionAccount {
    position: {
        value: string;
        label: {
            [key: string]: {
                name: string;
            };
        };
    }[];
    department: {
        value: string;
        label: {
            [key: string]: {
                name: string;
            };
        };
    }[];
    permission: {
        value: string;
        label: {
            [key: string]: {
                name: string;
            };
        };
    }[];
    select?: {
        position: string;
        department: string;
        permission: string;
    }
}