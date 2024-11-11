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
exports.default = LogInPage;
const react_hook_form_1 = require("react-hook-form");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const userApi_1 = require("../utils/api/userApi");
const image_1 = __importDefault(require("next/image"));
const Login_module_css_1 = __importDefault(require("../styles/Login.module.css"));
const login_logo_png_1 = __importDefault(require("../../public/login_logo.png"));
const login_eye_open_png_1 = __importDefault(require("../../public/login_eye_open.png"));
const login_eye_close_png_1 = __importDefault(require("../../public/login_eye_close.png"));
const ic_kakao_png_1 = __importDefault(require("../../public/sns_icon/ic_kakao.png"));
const ic_google_png_1 = __importDefault(require("../../public/sns_icon/ic_google.png"));
const react_1 = require("react");
const Modal_1 = require("../utils/Modal");
function LogInPage() {
    const [errorMsg, setErrorMsg] = (0, react_1.useState)('');
    const [isShowModal, setIsShowModal] = (0, react_1.useState)(false);
    const [isShowPassword, setIsShowPassword] = (0, react_1.useState)(false);
    const [passwordValue, setPasswordValue] = (0, react_1.useState)({
        type: 'password',
        imag: login_eye_close_png_1.default,
    });
    const router = (0, router_1.useRouter)();
    const { register, handleSubmit, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)();
    const onShowPassword = () => {
        setIsShowPassword((prev) => !prev);
        setPasswordValue({
            type: isShowPassword ? 'password' : 'text',
            imag: isShowPassword ? login_eye_close_png_1.default : login_eye_open_png_1.default,
        });
    };
    const onSubmitHandler = (data) => __awaiter(this, void 0, void 0, function* () {
        const resData = yield (0, userApi_1.postUserLogInApi)({
            email: data.email,
            encryptedPassword: data.password,
        });
        if (resData && resData.accessToken) {
            router.push('/fleamarket');
        }
        else {
            setErrorMsg(resData);
            setIsShowModal(true);
        }
    });
    return (<>
      {isShowModal && (<Modal_1.AuthModal errorMsg={errorMsg} setIsShowModal={setIsShowModal}/>)}
      <form onSubmit={handleSubmit(onSubmitHandler)} className={Login_module_css_1.default.logInForm}>
        <image_1.default src={login_logo_png_1.default} alt='로고' className={Login_module_css_1.default.logo}/>
        <div className={Login_module_css_1.default.text}>이메일</div>
        <input className={errors.email ? Login_module_css_1.default.inputError : Login_module_css_1.default.input} placeholder='email' {...register('email', {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    })}/>
        {errors.email && (<span className={Login_module_css_1.default.errorMsg}>잘못된 이메일 형식입니다</span>)}
        <div className={Login_module_css_1.default.text}>비밀번호</div>
        <div className={Login_module_css_1.default.passwordLayout}>
          <input className={errors.password ? Login_module_css_1.default.inputError : Login_module_css_1.default.input} placeholder='password' type={passwordValue.type} {...register('password', { required: true, minLength: 8 })}/>
          <image_1.default src={passwordValue.imag} alt='비밀번호 보이기' onClick={onShowPassword} className={Login_module_css_1.default.showPasswordIcon}/>
        </div>

        {errors.password && (<span className={Login_module_css_1.default.errorMsg}>
            비밀번호는 8자 이상이여야 합니다
          </span>)}
        <button type='submit' disabled={!isValid} className={!isValid ? Login_module_css_1.default.submitNone : Login_module_css_1.default.submit}>
          로그인
        </button>
        <div className={Login_module_css_1.default.otherLogin}>
          <span>간편 로그인하기</span>
          <div className={Login_module_css_1.default.snsIcon}>
            <link_1.default href='https://www.google.com/'>
              <image_1.default src={ic_google_png_1.default} alt='구글 로그인'/>
            </link_1.default>
            <link_1.default href='https://www.kakaocorp.com/page'>
              <image_1.default src={ic_kakao_png_1.default} alt='카카오 로그인'/>
            </link_1.default>
          </div>
        </div>
        <div className={Login_module_css_1.default.footer}>
          <span>판마마켓이 처음이신가요?</span>
          <link_1.default href='/register'>
            <span className={Login_module_css_1.default.register}>회원가입</span>
          </link_1.default>
        </div>
      </form>
    </>);
}
