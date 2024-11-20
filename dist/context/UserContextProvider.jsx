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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserAuth = exports.UserContextProvider = void 0;
const react_1 = require("react");
const userApi_1 = require("../utils/api/userApi");
const UserContext = (0, react_1.createContext)({
    user: null,
    isPending: true,
});
const UserContextProvider = ({ children }) => {
    const [values, setValues] = (0, react_1.useState)({ user: null, isPending: true });
    (0, react_1.useEffect)(() => {
        setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { isPending: true })));
        const fetchUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const userInfo = yield (0, userApi_1.fetchUserInfoApi)();
                setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { user: userInfo, isPending: false })));
            }
            else {
                setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { isPending: false })));
            }
        });
        fetchUserInfo();
    }, []);
    return (<UserContext.Provider value={{ user: values.user, isPending: values.isPending }}>
      {children}
    </UserContext.Provider>);
};
exports.UserContextProvider = UserContextProvider;
const useUserAuth = () => {
    const context = (0, react_1.useContext)(UserContext);
    return context;
};
exports.useUserAuth = useUserAuth;
