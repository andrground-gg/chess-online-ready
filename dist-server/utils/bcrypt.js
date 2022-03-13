"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
function encodePassword(rawPassword) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
function comparePasswords(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=bcrypt.js.map