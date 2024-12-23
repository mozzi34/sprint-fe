"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DateFormat;
function DateFormat({ createDate }) {
    let date = createDate.createdAt.toDateString();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month <= 10) {
        month = '0' + month;
    }
    if (day <= 10) {
        day = '0' + day;
    }
    let resultDate = `${year}.${month}.${day}`;
    return resultDate;
}
