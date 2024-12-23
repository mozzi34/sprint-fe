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
exports.fetchCommentsApi = fetchCommentsApi;
exports.postCommentApi = postCommentApi;
exports.editCommentApi = editCommentApi;
exports.deleteCommentApi = deleteCommentApi;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://sprint-be-ztdn.onrender.com/comment/',
});
function fetchCommentsApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ articleId, category, cursorId, }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.get(`${category}/${articleId}`, {
                headers: config.headers,
                params: { limit: 5, cursor: cursorId },
            });
            return {
                comments: res.data.comments || [],
                totalCount: res.data.totalCount || 0,
            };
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return {
                comments: [],
                totalCount: 0,
            };
        }
    });
}
function postCommentApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ category, articleId, comment, userId, }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.post(`${category}/${articleId}`, {
                content: comment,
                articleId: articleId,
                userId: userId,
            }, config);
            return res.data;
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
}
function editCommentApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, editComment }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.patch(`${id}`, {
                content: editComment,
            }, config);
            return res.data;
        }
        catch (error) {
            console.error('Error editing data:', error);
            throw error;
        }
    });
}
function deleteCommentApi(targetId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.delete(`${targetId}`, config);
            return {};
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
        finally {
        }
    });
}
