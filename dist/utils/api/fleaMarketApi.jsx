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
exports.fetchFleaMarketBestApi = fetchFleaMarketBestApi;
exports.fetchFleaMarketApi = fetchFleaMarketApi;
exports.fetchFleaMarketDetailApi = fetchFleaMarketDetailApi;
exports.postFleaMarketArticleApi = postFleaMarketArticleApi;
exports.editFleaMarketArticleApi = editFleaMarketArticleApi;
exports.deleteFleaMarketArticleApi = deleteFleaMarketArticleApi;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://sprint-be-ztdn.onrender.com/fleamarket',
});
function fetchFleaMarketBestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield instance.get(`/`, {
                params: {
                    sort: 'favorite',
                    limit: 4,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
}
function fetchFleaMarketApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ keyword, sort, page, }) {
        try {
            const res = yield instance.get(`/`, {
                params: {
                    keyword: keyword || '',
                    sort: sort,
                    page: page,
                    limit: 10,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
}
function fetchFleaMarketDetailApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, userId, }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.get(`/${id}`, {
                headers: config.headers,
                params: { userId },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function postFleaMarketArticleApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, content, images, price, userId, tags, }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', userId);
            images.forEach((file) => {
                formData.append('images', file);
            });
            tags.forEach((tag) => {
                formData.append('tags', tag);
            });
            if (typeof price === 'string') {
                formData.append('price', price);
            }
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.post(`/post`, formData, config);
            return res;
        }
        catch (error) {
            alert('게시물 등록에 실패했습니다.');
            console.error('Error posting data:', error);
        }
    });
}
function editFleaMarketArticleApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, title, content, images, price, userId, tags, }) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', userId);
            images === null || images === void 0 ? void 0 : images.forEach((file) => {
                formData.append('images', file);
            });
            tags.forEach((tag) => {
                formData.append('tags', tag);
            });
            if (typeof price === 'string') {
                formData.append('price', price);
            }
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const res = yield instance.patch(`/${id}/edit`, formData, config);
            return res.data;
        }
        catch (error) {
            console.error('Error editing data:', error);
        }
    });
}
function deleteFleaMarketArticleApi(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const res = yield instance.delete(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return;
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
    });
}
