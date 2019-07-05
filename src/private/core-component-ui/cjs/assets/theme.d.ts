export declare const hexToRgb: (input: any) => string;
export declare function rgbaToHex(rgba: string | any): string;
export declare const registerTheme: (key: string, theme: any) => boolean;
export declare function getTheme(name?: string): any;
export declare function getThemes(name?: string): {
    key: string;
    name: string;
    color: string;
    active: boolean;
}[];
export declare function BlueGrayThemes(): {
    palette: {
        type: string;
        common: {
            black: string;
            white: string;
        };
        primary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        secondary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        thirdary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        error: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
            hint: string;
        };
    };
    overrides: {
        shadowsCustomFooter1: string;
        backgroundHover_1: string;
        shadowsHover_1: string;
        shadowsHover_2: string;
        colorHover_1: string;
        backgroundBody: string;
        backgroundWhite: string;
        shadowsHoverPri_1: string;
        shadowsHoverPri_2: string;
        shadowsHoverSec_1: string;
        shadowsHoverSec_2: string;
        shadowsHoverThi_1: string;
        shadowsHoverThi_2: string;
    };
};
export declare function DeepPurpleThemes(): {
    palette: {
        type: string;
        common: {
            black: string;
            white: string;
        };
        primary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        secondary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        thirdary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        error: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
            hint: string;
        };
    };
    overrides: {
        shadowsCustomFooter1: string;
        backgroundHover_1: string;
        shadowsHover_1: string;
        shadowsHover_2: string;
        colorHover_1: string;
        backgroundBody: string;
        backgroundWhite: string;
        shadowsHoverPri_1: string;
        shadowsHoverPri_2: string;
        shadowsHoverSec_1: string;
        shadowsHoverSec_2: string;
        shadowsHoverThi_1: string;
        shadowsHoverThi_2: string;
    };
};
export declare function DefaultThemes(): {
    palette: {
        type: string;
        common: {
            black: string;
            white: string;
        };
        primary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        secondary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        thirdary: {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
            hint: string;
        };
    };
    overrides: {
        shadowsCustomFooter1: string;
        backgroundHover_1: string;
        shadowsHover_1: string;
        shadowsHover_2: string;
        colorHover_1: string;
        backgroundBody: string;
        backgroundWhite: string;
        shadowsHoverPri_1: string;
        shadowsHoverPri_2: string;
        shadowsHoverSec_1: string;
        shadowsHoverSec_2: string;
        shadowsHoverThi_1: string;
        shadowsHoverThi_2: string;
    };
};
