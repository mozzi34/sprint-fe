"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const logo_png_1 = __importDefault(require("../../public/logo.png"));
const logo_mobile_png_1 = __importDefault(require("../../public/logo_mobile.png"));
const login_btn_png_1 = __importDefault(require("../../public/login_btn.png"));
const image_1 = __importDefault(require("next/image"));
const Navbar_module_css_1 = __importDefault(require("../styles/Navbar.module.css"));
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const Button_1 = require("../utils/Button");
const UserContextProvider_1 = require("../context/UserContextProvider");
function Navbar() {
    const router = (0, router_1.useRouter)();
    const { user, isPending } = (0, UserContextProvider_1.useUserAuth)();
    return (<>
      <div className={Navbar_module_css_1.default.nav}>
        <div className={Navbar_module_css_1.default.navMenu}>
          <div className={Navbar_module_css_1.default.menu}>
            <link_1.default href='/' className={Navbar_module_css_1.default.link}>
              <image_1.default src={logo_png_1.default} alt='로고' className={Navbar_module_css_1.default.logo} priority/>
              <image_1.default src={logo_mobile_png_1.default} alt='모바일 로고' className={Navbar_module_css_1.default.logoMobile} priority/>
            </link_1.default>
            <link_1.default href='/freeboard' className={Navbar_module_css_1.default.link}>
              <span className={router.pathname.startsWith('/freeboard')
            ? Navbar_module_css_1.default.selectBoard
            : Navbar_module_css_1.default.none}>
                자유게시판
              </span>
            </link_1.default>
            <link_1.default href='/fleamarket' className={Navbar_module_css_1.default.link}>
              <span className={router.pathname.startsWith('/fleamarket')
            ? Navbar_module_css_1.default.selectBoard
            : Navbar_module_css_1.default.none}>
                중고마켓
              </span>
            </link_1.default>
          </div>
          {user ? (<div>
              <div>{user.nickname}</div>
              <Button_1.NavLogButton onClick='undefined' label='로그아웃'/>
            </div>) : (<link_1.default href='/login' className={Navbar_module_css_1.default.link}>
              <image_1.default src={login_btn_png_1.default} alt='로그인버튼'/>
            </link_1.default>)}
        </div>
      </div>
    </>);
}
