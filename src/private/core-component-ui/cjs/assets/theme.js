"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var themeColors_1 = require("./themeColors");
exports.hexToRgb = function (input) {
    input = input + "";
    input = input.replace("#", "");
    var hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        input = input[0] + input[0] + input[1] + input[1] + input[2] + input[2];
    }
    input = input.toUpperCase(input);
    var first = input[0] + input[1];
    var second = input[2] + input[3];
    var last = input[4] + input[5];
    return (parseInt(first, 16) +
        ", " +
        parseInt(second, 16) +
        ", " +
        parseInt(last, 16));
};
function trim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
}
function rgbaToHex(rgba) {
    var parts = rgba.substring(rgba.indexOf("(")).split(",");
    var r = parseInt(trim(parts[0].substring(1)), 10);
    var g = parseInt(trim(parts[1]), 10);
    var b = parseInt(trim(parts[2]), 10);
    var a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);
    return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (parseFloat(a) * 255).toString(16).substring(0, 2));
}
exports.rgbaToHex = rgbaToHex;
var registers = {
    'blue_gray': BlueGrayThemes(),
    'deep_purple': DeepPurpleThemes(),
    'default': DefaultThemes(),
};
var colors = [
    {
        key: 'blue_gray',
        name: "Blue Gray",
        color: BlueGrayThemes().palette.primary.light,
        active: false
    },
    {
        key: 'deep_purple',
        name: "Deep Purple",
        color: DeepPurpleThemes().palette.primary.light,
        active: false
    },
    {
        key: 'default',
        name: "Default",
        color: DefaultThemes().palette.primary.light,
        active: false
    },
];
exports.registerTheme = function (key, theme) {
    if (registers["" + key]) {
        colors.filter(function (item) { return item.key === key; })[0].color = theme.palette.primary.light;
    }
    else {
        colors.push({
            key: name,
            name: name,
            color: theme.palette.primary.light,
            active: false
        });
    }
    registers["" + name] = theme;
    return true;
};
function getTheme(name) {
    if (registers["" + name]) {
        return registers["" + name];
    }
    else {
        return registers["blue_gray"];
    }
}
exports.getTheme = getTheme;
function getThemes(name) {
    for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
        var item = colors_1[_i];
        if (item.name === name && name) {
            item.active = true;
            break;
        }
    }
    return colors;
}
exports.getThemes = getThemes;
function BlueGrayThemes() {
    return {
        palette: {
            type: "light",
            common: {
                black: themeColors_1.BLACK_COLOR,
                white: themeColors_1.WHITE_COLOR
            },
            primary: {
                light: themeColors_1.BLUE_GRAY[0],
                main: themeColors_1.BLUE_GRAY[0],
                dark: themeColors_1.BLUE_GRAY[0],
                contrastText: themeColors_1.WHITE_COLOR
            },
            secondary: {
                light: themeColors_1.BLUE_GRAY[1],
                main: themeColors_1.BLUE_GRAY[1],
                dark: themeColors_1.BLUE_GRAY[1],
                contrastText: themeColors_1.WHITE_COLOR
            },
            thirdary: {
                light: themeColors_1.BLUE_GRAY[2],
                main: themeColors_1.BLUE_GRAY[2],
                dark: themeColors_1.BLUE_GRAY[2],
                contrastText: themeColors_1.WHITE_COLOR
            },
            error: {
                light: themeColors_1.BLUE_GRAY[2],
                main: themeColors_1.BLUE_GRAY[2],
                dark: themeColors_1.BLUE_GRAY[2],
                contrastText: themeColors_1.WHITE_COLOR
            },
            text: {
                primary: "rgba(0, 0, 0, 1)",
                secondary: "rgba(0, 0, 0, 1)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)",
            },
        },
        overrides: {
            shadowsCustomFooter1: "0px -1px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[0]) + ",0.75)",
            backgroundHover_1: "#ddd",
            shadowsHover_1: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",0.3)",
            shadowsHover_2: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",1)",
            colorHover_1: themeColors_1.BLACK_COLOR,
            backgroundBody: "#ddd",
            backgroundWhite: "white",
            shadowsHoverPri_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[0]) + ", 0.46)",
            shadowsHoverPri_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[0]) + ", 0.1)",
            shadowsHoverSec_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[1]) + ", 0.46)",
            shadowsHoverSec_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[1]) + ", 0.1)",
            shadowsHoverThi_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[2]) + ", 0.46)",
            shadowsHoverThi_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.BLUE_GRAY[2]) + ", 0.1)",
        },
    };
}
exports.BlueGrayThemes = BlueGrayThemes;
function DeepPurpleThemes() {
    return {
        palette: {
            type: "light",
            common: {
                black: themeColors_1.BLACK_COLOR,
                white: themeColors_1.WHITE_COLOR
            },
            primary: {
                light: themeColors_1.DEEP_PURPLE[0],
                main: themeColors_1.DEEP_PURPLE[0],
                dark: themeColors_1.DEEP_PURPLE[0],
                contrastText: themeColors_1.WHITE_COLOR
            },
            secondary: {
                light: themeColors_1.DEEP_PURPLE[1],
                main: themeColors_1.DEEP_PURPLE[1],
                dark: themeColors_1.DEEP_PURPLE[1],
                contrastText: themeColors_1.WHITE_COLOR
            },
            thirdary: {
                light: themeColors_1.DEEP_PURPLE[2],
                main: themeColors_1.DEEP_PURPLE[2],
                dark: themeColors_1.DEEP_PURPLE[2],
                contrastText: themeColors_1.WHITE_COLOR
            },
            error: {
                light: themeColors_1.DEEP_PURPLE[2],
                main: themeColors_1.DEEP_PURPLE[2],
                dark: themeColors_1.DEEP_PURPLE[2],
                contrastText: themeColors_1.WHITE_COLOR
            },
            text: {
                primary: "rgba(0, 0, 0, 1)",
                secondary: "rgba(0, 0, 0, 1)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)",
            },
        },
        overrides: {
            shadowsCustomFooter1: "0px -1px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[0]) + ",0.75)",
            backgroundHover_1: "#ddd",
            shadowsHover_1: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",0.3)",
            shadowsHover_2: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",1)",
            colorHover_1: themeColors_1.BLACK_COLOR,
            backgroundBody: "#ddd",
            backgroundWhite: "white",
            shadowsHoverPri_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[0]) + ", 0.46)",
            shadowsHoverPri_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[0]) + ", 0.1)",
            shadowsHoverSec_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[1]) + ", 0.46)",
            shadowsHoverSec_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[1]) + ", 0.1)",
            shadowsHoverThi_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[2]) + ", 0.46)",
            shadowsHoverThi_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEEP_PURPLE[2]) + ", 0.1)",
        },
    };
}
exports.DeepPurpleThemes = DeepPurpleThemes;
function DefaultThemes() {
    return {
        palette: {
            type: "light",
            common: {
                black: themeColors_1.BLACK_COLOR,
                white: themeColors_1.WHITE_COLOR
            },
            primary: {
                light: themeColors_1.DEFAULT[0],
                main: themeColors_1.DEFAULT[0],
                dark: themeColors_1.DEFAULT[0],
                contrastText: themeColors_1.WHITE_COLOR
            },
            secondary: {
                light: themeColors_1.DEFAULT[1],
                main: themeColors_1.DEFAULT[1],
                dark: themeColors_1.DEFAULT[1],
                contrastText: themeColors_1.WHITE_COLOR
            },
            thirdary: {
                light: themeColors_1.DEFAULT[2],
                main: themeColors_1.DEFAULT[2],
                dark: themeColors_1.DEFAULT[2],
                contrastText: themeColors_1.WHITE_COLOR
            },
            text: {
                primary: "rgba(0, 0, 0, 1)",
                secondary: "rgba(0, 0, 0, 1)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)",
            },
        },
        overrides: {
            shadowsCustomFooter1: "0px -1px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[0]) + ",0.75)",
            backgroundHover_1: "#ddd",
            shadowsHover_1: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",0.3)",
            shadowsHover_2: "0px 3px 5px 0px rgba(" + exports.hexToRgb(themeColors_1.BLACK_COLOR) + ",1)",
            colorHover_1: themeColors_1.BLACK_COLOR,
            backgroundBody: "#ddd",
            backgroundWhite: "white",
            shadowsHoverPri_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[0]) + ", 0.46)",
            shadowsHoverPri_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[0]) + ", 0.1)",
            shadowsHoverSec_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[1]) + ", 0.46)",
            shadowsHoverSec_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[1]) + ", 0.1)",
            shadowsHoverThi_1: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[2]) + ", 0.46)",
            shadowsHoverThi_2: " 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + exports.hexToRgb(themeColors_1.DEFAULT[2]) + ", 0.1)",
        },
    };
}
exports.DefaultThemes = DefaultThemes;
