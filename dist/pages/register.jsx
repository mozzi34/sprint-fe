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
exports.default = RegisterPage;
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const userApi_1 = require("../utils/api/userApi");
const image_1 = __importDefault(require("next/image"));
const Login_module_css_1 = __importDefault(require("@/styles/Login.module.css"));
const login_eye_open_png_1 = __importDefault(require("@/public/login_eye_open.png"));
const login_eye_close_png_1 = __importDefault(require("@/public/login_eye_close.png"));
const login_logo_png_1 = __importDefault(require("@/public/login_logo.png"));
const ic_kakao_png_1 = __importDefault(require("@/public/sns_icon/ic_kakao.png"));
const ic_google_png_1 = __importDefault(require("@/public/sns_icon/ic_google.png"));
const Modal_1 = require("../utils/Modal");
function RegisterPage() {
    const [errorMsg, setErrorMsg] = (0, react_1.useState)('');
    const [isShowModal, setIsShowModal] = (0, react_1.useState)(false);
    const [isShowPassword, setIsShowPassword] = (0, react_1.useState)(false);
    const [passwordValue, setPasswordValue] = (0, react_1.useState)({
        type: 'password',
        imag: login_eye_close_png_1.default,
    });
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = (0, react_1.useState)(false);
    const [passwordConfirmValue, setPasswordConfirmValue] = (0, react_1.useState)({
        type: 'password',
        imag: login_eye_close_png_1.default,
    });
    const router = (0, router_1.useRouter)();
    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)();
    const onShowPassword = () => {
        setIsShowPassword((prev) => !prev);
        setPasswordValue({
            type: isShowPassword ? 'password' : 'text',
            imag: isShowPassword ? login_eye_close_png_1.default : login_eye_open_png_1.default,
        });
    };
    const onShowPasswordConfirm = () => {
        setIsShowPasswordConfirm((prev) => !prev);
        setPasswordConfirmValue({
            type: isShowPasswordConfirm ? 'password' : 'text',
            imag: isShowPasswordConfirm ? login_eye_close_png_1.default : login_eye_open_png_1.default,
        });
    };
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        const resData = yield (0, userApi_1.postUserRegisterApi)({
            email: data.email,
            nickname: data.nickname,
            password: data.password,
        });
        if (resData && resData.accessToken) {
            // router.push('/login');
            console.log(resData);
        }
        else {
            setErrorMsg(resData); // 에러 메시지 설정
            setIsShowModal(true); // 모달 표시
        }
    });
    (0, react_1.useEffect)(() => {
        const password = watch('password');
        const passwordConfirmation = watch('passwordConfirmation');
        if (password && passwordConfirmation && password !== passwordConfirmation) {
            setError('passwordConfirmation', {
                type: 'manual',
                message: '비밀번호가 일치하지 않습니다.',
            });
        }
        else {
            clearErrors('passwordConfirmation');
        }
    }, [watch('password'), watch('passwordConfirmation'), setError, clearErrors]);
    const isFormValid = isValid && !errors.passwordConfirmation;
    return (<>
      {isShowModal && (<Modal_1.AuthModal errorMsg={errorMsg} setIsShowModal={setIsShowModal}/>)}
      <form onSubmit={handleSubmit(onSubmit)} className={Login_module_css_1.default.registerForm}>
        <image_1.default src={login_logo_png_1.default} alt='로고' className={Login_module_css_1.default.logo}/>
        <div className={Login_module_css_1.default.text}>이메일</div>
        <input className={errors.email ? Login_module_css_1.default.inputError : Login_module_css_1.default.input} placeholder='email' {...register('email', {
        required: '이메일을 입력해주세요.',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '올바른 이메일 형식이 아닙니다.',
        },
    })}/>
        {errors.email && (<span className={Login_module_css_1.default.errorMsg}>{errors.email.message}</span>)}

        <div className={Login_module_css_1.default.text}>닉네임</div>
        <input className={Login_module_css_1.default.input} placeholder='nickname' {...register('nickname', {
        required: '닉네임을 입력해주세요.',
    })}/>
        {errors.nickname && (<span className={Login_module_css_1.default.errorMsg}>{errors.nickname.message}</span>)}

        <div className={Login_module_css_1.default.text}>비밀번호</div>
        <div className={Login_module_css_1.default.passwordLayout}>
          <input className={errors.password ? Login_module_css_1.default.inputError : Login_module_css_1.default.input} placeholder='password' type={passwordValue.type} {...register('password', {
        required: '비밀번호를 입력해주세요.',
        minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이여야 합니다.',
        },
    })}/>
          <image_1.default src={passwordValue.imag} alt='비밀번호 보이기' onClick={(e) => {
            e.preventDefault();
            onShowPassword();
        }} className={Login_module_css_1.default.showPasswordIcon}/>
        </div>
        {errors.password && (<span className={Login_module_css_1.default.errorMsg}>{errors.password.message}</span>)}

        <div className={Login_module_css_1.default.text}>비밀번호 확인</div>
        <div className={Login_module_css_1.default.passwordLayout}>
          <input className={errors.passwordConfirmation ? Login_module_css_1.default.inputError : Login_module_css_1.default.input} placeholder='password' type={passwordConfirmValue.type} {...register('passwordConfirmation', {
        required: '비밀번호 확인을 입력해주세요.',
        minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이여야 합니다.',
        },
    })}/>
          <image_1.default src={passwordConfirmValue.imag} alt='비밀번호 보이기' onClick={(e) => {
            e.preventDefault();
            onShowPasswordConfirm();
        }} className={Login_module_css_1.default.showPasswordIcon}/>
        </div>
        {errors.passwordConfirmation && (<span className={Login_module_css_1.default.errorMsg}>
            {errors.passwordConfirmation.message}
          </span>)}

        <button disabled={!isFormValid} type='submit' className={!isFormValid ? Login_module_css_1.default.submitNone : Login_module_css_1.default.submit}>
          회원가입
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
          <span>이미 회원이신가요?</span>
          <link_1.default href='/login'>
            <span className={Login_module_css_1.default.register}>로그인</span>
          </link_1.default>
        </div>
      </form>
    </>);
}
