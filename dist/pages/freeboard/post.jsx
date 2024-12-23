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
exports.default = PostArticlePage;
const react_1 = require("react");
const router_1 = require("next/router");
const ArticleFormFields_module_css_1 = __importDefault(require("../../styles/ArticleFormFields.module.css"));
const Button_1 = require("../../utils/Button");
const TitleInput_1 = __importDefault(require("../../components/Post/TitleInput"));
const ContentInput_1 = __importDefault(require("../../components/Post/ContentInput"));
const useFreeBoard_1 = require("../../hooks/useFreeBoard");
function PostArticlePage() {
    const [values, setValues] = (0, react_1.useState)({
        title: '',
        content: '',
        image: [],
    });
    const [canSubmit, setCanSubmit] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const { postComment } = (0, useFreeBoard_1.useEditArticle)(id);
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const newPost = {
                title: values.title,
                content: values.content,
                userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
            };
            postComment(newPost);
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
    const onChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        setCanSubmit(values.title.trim() !== '' && values.content.trim() !== '');
    };
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // toast.error('로그인을 해야 합니다.');
                router.push('/login'); //비동기
            }
        });
        fetchData();
    }, [router]);
    return (<>
      <div className={ArticleFormFields_module_css_1.default.postLayout}>
        <div className={ArticleFormFields_module_css_1.default.header}>
          <span className={ArticleFormFields_module_css_1.default.title}>게시물 등록</span>
        </div>
        <Button_1.ArticleButton disabled={!canSubmit} label='등록' onClick={handleSubmit}/>
        <TitleInput_1.default values={values} onChange={onChange}/>
        <ContentInput_1.default values={values} onChange={onChange}/>
      </div>
    </>);
}
