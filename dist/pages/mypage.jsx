"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyPage;
const router_1 = require("next/router");
const AuthProvider_1 = require("../utils/AuthProvider");
function MyPage() {
    const { user } = (0, AuthProvider_1.useAuth)(true);
    const router = (0, router_1.useRouter)();
    return (<>
      <div>회원정보</div>
      <div>닉네임</div>
      <div>{user ? user.nickname : ''}</div>
    </>);
}
