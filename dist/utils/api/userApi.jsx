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
exports.fetchUserInfoApi = fetchUserInfoApi;
exports.postUserRegisterApi = postUserRegisterApi;
exports.postUserLogInApi = postUserLogInApi;
exports.fetchUserTokenApi = fetchUserTokenApi;
exports.deleteUserLogOutApi = deleteUserLogOutApi;
exports.editUserInfoApi = editUserInfoApi;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://sprint-be-ztdn.onrender.com/',
});
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       const token = getCookie('refreshToken');
//       const accessToken = await getUserTokenApi({ token });
//       error.config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return Promise.reject(error);
//   }
// );
function fetchUserInfoApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const res = yield instance.get(`auth`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        }
        catch (error) {
            console.error('Error getting user info:', error);
        }
    });
}
function postUserRegisterApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, nickname, password, }) {
        try {
            const res = yield instance.post(`user/auth/signUp`, {
                email,
                nickname,
                encryptedPassword: password,
            });
            return res.data;
        }
        catch (error) {
            return error.response.data.message;
        }
    });
}
function postUserLogInApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, encryptedPassword, }) {
        try {
            const res = yield instance.post(`user/auth/logIn`, {
                email,
                encryptedPassword,
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log(res.data);
            return res.data;
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
}
function fetchUserTokenApi(_a) {
    return __awaiter(this, arguments, void 0, function* ({ token }) {
        try {
            const res = yield instance.post(`user/auth/refresh-token`, {
                refreshToken: token,
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            return res.data.accessToken;
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
}
function deleteUserLogOutApi() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function editUserInfoApi() {
    return __awaiter(this, void 0, void 0, function* () { });
}
