"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFavoriteApi = postFavoriteApi;
exports.deleteFavoriteApi = deleteFavoriteApi;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://sprint-be-ztdn.onrender.com/favorite',
});
let accessToken;
if (typeof window !== 'undefined') {
    // Perform localStorage action
    accessToken = localStorage.getItem('accessToken');
}
// export async function postFavoriteApi({ articleId, userId, accessToken }) {
function postFavoriteApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ articleId }) {
        try {
            // const config = {
            //   headers: {
            //     Authorization: `Bearer ${accessToken}`,
            //   },
            //   params: { userId },
            // };
            // const res = await instance.post(`/${articleId}`, {}, config);
            const res = yield instance.post(`/${articleId}`, {});
            return res.data;
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
}
function deleteFavoriteApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ articleId, userId }) {
        try {
            // const config = {
            //   headers: {
            //     Authorization: `Bearer ${accessToken}`,
            //   },
            // };
            const res = yield instance.delete(`/${articleId}`, {
                params: { userId },
            });
            return {};
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
    });
}
