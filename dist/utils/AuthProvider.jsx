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
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = require("react");
const react_2 = require("react");
const userApi_1 = require("../utils/api/userApi");
const router_1 = require("next/router");
const react_3 = __importDefault(require("react"));
const AuthContext = react_3.default.createContext(undefined);
function AuthProvider({ children }) {
    const [values, setValues] = (0, react_2.useState)({ user: null, isPending: true });
    const getMe = () => __awaiter(this, void 0, void 0, function* () {
        setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { isPending: true })));
        try {
            const res = yield (0, userApi_1.fetchUserInfoApi)();
            setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { user: res, isPending: false })));
        }
        catch (error) {
            setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { isPending: false })));
            console.error('Error fetching user info:', error);
        }
    });
    const login = (_a) => __awaiter(this, [_a], void 0, function* ({ email, encryptedPassword }) {
        const resData = yield (0, userApi_1.postUserLogInApi)({
            email,
            encryptedPassword,
        });
        yield getMe(); // 사용자 정보 업데이트
        return resData; // 응답 데이터 반환
    });
    const logout = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, userApi_1.deleteUserLogOutApi)();
    });
    const editInfo = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, userApi_1.editUserInfoApi)();
        // setValues((prevValues) => ({
        //   ...prevValues,
        //   user: res,
        //   isPending: false,
        // }));
    });
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            getMe();
        }
    }, []);
    return (<AuthContext.Provider value={{
            user: values.user,
            isPending: values.isPending,
            login,
            editInfo,
        }}>
      {children}
    </AuthContext.Provider>);
}
function useAuth(required) {
    const context = (0, react_1.useContext)(AuthContext);
    const router = (0, router_1.useRouter)();
    if (!context) {
        throw new Error('반드시 AuthProvider 안에서 사용해야 합니다!');
    }
    (0, react_1.useEffect)(() => {
        if (required && !context.user && !context.isPending) {
            router.push('/login');
        }
    }, [context.user, context.isPending, router, required]);
    return context;
}
