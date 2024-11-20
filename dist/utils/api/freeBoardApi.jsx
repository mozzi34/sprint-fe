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
exports.fetchFreeBoardBestApi = fetchFreeBoardBestApi;
exports.fetchFreeBoardApi = fetchFreeBoardApi;
exports.fetchFreeBoardArticleApi = fetchFreeBoardArticleApi;
exports.postFreeBoardArticleApi = postFreeBoardArticleApi;
exports.editArticleApi = editArticleApi;
exports.deleteArticleApi = deleteArticleApi;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://sprint-be-ztdn.onrender.com/freeboard',
});
function fetchFreeBoardBestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield instance.get(`/`, {
                params: {
                    sort: 'favorite',
                    limit: 3,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
}
function fetchFreeBoardApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ keyword, sort, page, }) {
        try {
            const res = yield instance.get(`/`, {
                params: {
                    keyword: keyword || '',
                    sort: sort,
                    page: page,
                    limit: 5,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error fetching articles:', error);
        }
    });
}
function fetchFreeBoardArticleApi(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield instance.get(`/${id}`);
            return res.data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function postFreeBoardArticleApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, content, userId, }) {
        try {
            const res = yield instance.post(`/post`, {
                title: title,
                content: content,
                // images: images || [],
                // tags: tags || [],
                userId: userId,
            });
            return res.data;
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
}
// export async function postArticleApi({
//   title,
//   content,
//   image,
//   price,
//   tags,
//   category,
// }) {
//   try {
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     formData.append('category', category);
//     formData.append('userId', '86d761e4-a9d0-4082-96dd-cf6f2c931673');
//     formData.append('images', image);
//     // if (tags) {
//     //   tags.forEach((tag) => {
//     //     formData.append('tags', tag);
//     //   });
//     // }
//     // if (priceValue) {
//     //   formData.append('price', price || null);
//     // }
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     const res = await axios.post(`${baseUrl}`, formData);
//     console.log(res);
//     return res;
//   } catch (error) {
//     alert('게시물 등록에 실패했습니다.');
//     console.error('Error deleting data:', error);
//   }
// }
function editArticleApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, content, id, }) {
        try {
            const res = yield instance.patch(`/${id}`, {
                title: title,
                content: content,
            });
            return res.data;
        }
        catch (error) {
            console.error('Error editing data:', error);
        }
    });
}
function deleteArticleApi(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield instance.delete(`/${id}`);
            return {};
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
    });
}
