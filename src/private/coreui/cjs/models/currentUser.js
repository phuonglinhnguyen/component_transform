"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrentUserEntity = /** @class */ (function () {
    function CurrentUserEntity(props) {
        if (props) {
            this.username = props.username;
            this.displayName = props.displayName;
            this.email = props.email;
        }
        else {
            this.username = '';
            this.displayName = '';
            this.email = '';
        }
    }
    return CurrentUserEntity;
}());
exports.CurrentUserEntity = CurrentUserEntity;
