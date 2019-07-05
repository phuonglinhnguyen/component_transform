"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const REGEX_EMPTY = "/^(\w+\S+)$" //eslint-disable-line
exports.REGEX_EMPTY = /^(?!\s*$).+/; // eslint-disable-line
exports.REGEX_NUMBER = /^[0-9]*$/gm; // eslint-disable-line
exports.REGEX_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im; // eslint-disable-line
exports.REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
exports.REGEX_CHARACTERS = /^[A-Z]+$/i;
exports.REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// This regex will enforce these rules REGEX_PASSWORD:
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
exports.REGEX_CHARACTERS_UTF8 = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
// ^                           # start-of-string
//     [
//     a-zA-Z_                 # contains alphabets and underscore
//     ÀÁÂ...ỵỷỹ               # characters in Vietnamese
//     \\s                     # whitespace
//     ]+                      # must contains one or more characters
// $                           # end-of-string
exports.KEY_FIELD_TYPE = "type";
exports.KEY_FIELD_TYPE_TEXT = "text";
exports.KEY_FIELD_TYPE_NUMBER_INT = "number_int";
exports.KEY_FIELD_TYPE_NUMBER_FLOAT = "number_float";
exports.KEY_FIELD_TYPE_PASSWORD = "password";
exports.KEY_FIELD_TYPE_DATE = "date";
exports.KEY_FIELD_TYPE_BOOLEAN = "boolean";
exports.KEY_FIELD_TYPE_CRON_TRIGGER = "cron_trigger";
exports.KEY_FIELD_TYPE_LABEL = "label";
exports.KEY_FIELD_TYPE_CHECKBOX_LIST = "checkbox_list";
exports.KEY_FIELD_TYPE_COMBOBOX = "combobox";
exports.KEY_FIELD_VALUES_LIST = "values_list";
exports.KEY_FIELD_TYPE_IMAGE = "image";
exports.KEY_FIELD_VALUE = "value";
exports.KEY_FIELD_ERROR = "error";
exports.KEY_FIELD_MAX_LENGTH = "max_length";
exports.KEY_FIELD_AUTO_FOCUS = "auto_focus";
exports.KEY_FIELD_INDEX_CONTENT = "index_content";
exports.KEY_FIELD_AUTO_RENDER = "auto_render";
exports.KEY_FIELD_COMPARE = "key_field_compare";
exports.KEY_FIELD_LINK = "field_link";
exports.KEY_FIELD_LIST_CRON_TRIGGER = "list_cron_trigger";
exports.KEY_FIELD_VIEW_CRON_VALUE = "view_cron_value";
exports.KEY_FIELD_RULES = "rules";
exports.KEY_FIELD_RULE_EMPTY = "rules_empty";
exports.KEY_FIELD_RULE_NUMBER = "rules_number";
exports.KEY_FIELD_RULE_PHONE_NUMBER = "rules_phone_number";
exports.KEY_FIELD_RULE_EMAIL = "rules_email";
exports.KEY_FIELD_RULE_COMPARE = "rules_compare";
exports.KEY_FIELD_RULE_CHARACTERS = "rules_characters";
exports.KEY_FIELD_RULE_CHARACTERS_UTF8 = "rules_characters_utf8";
exports.KEY_FIELD_RULE_18_PLUS = "rules_18_plus";
exports.KEY_FIELD_RULE_PASSWORD = "rules_password";
exports.KEY_FIELD_RULE_SIZE_LENGTH = "rules_size_length";
exports.KEY_FIELD_RULE_IMAGE = "rules_image";
