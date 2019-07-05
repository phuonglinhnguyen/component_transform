export interface IParamsItem {
    fieldKey: any;
    structures: any;
    dataGeneral: any;
    keyTranslate: any;
}
export declare const getItemByStructure: (input: IParamsItem) => any;
export interface IParamsString {
    fieldKey: any;
    dataGeneral: any;
    keyTranslate: any;
}
export declare const getDataByString: (input: IParamsString) => {
    level: string;
    keyTranslate: any;
    data: {
        fieldKey: any;
        fieldValue: any;
        fieldError: any;
        fieldAutoRender: any;
        fieldType: any;
        fieldListCBBorCKL: any;
        fieldLabelForTranslate: string;
        fieldAutoFocus: any;
        fieldRules: any;
        fieldMaxLength: any;
        fieldCompare: any;
        tabCronTrigger: any;
        viewCronValue: any;
    };
};
export interface IParamsObject {
    item: any;
    dataGeneral: any;
    keyTranslate: any;
    fieldParent: any;
}
export declare const getDataByObject: (input: IParamsObject) => any;
export interface IParamsArray {
    items: any;
    dataGeneral: any;
    keyTranslate: any;
    fieldParent: any;
    fieldParent2: any;
}
export declare const getDataByArray: (input: IParamsArray) => {
    level: string;
    fieldParent: any;
    fieldParent2: any;
    keyTranslate: any;
    data: any;
};
