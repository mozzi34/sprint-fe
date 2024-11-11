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
exports.default = PostFleaArticlePage;
const react_1 = require("react");
const router_1 = require("next/router");
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
const Button_js_1 = require("../../utils/Button.js");
const TitleInput_1 = __importDefault(require("../../components/Post/TitleInput"));
const ContentInput_1 = __importDefault(require("../../components/Post/ContentInput"));
const useFleaMarket_1 = require("../../hooks/useFleaMarket");
const FileInput_1 = __importDefault(require("../../components/Post/FileInput"));
const PriceInput_1 = __importDefault(require("../../components/Post/PriceInput"));
const TagsInput_1 = __importDefault(require("../../components/Post/TagsInput"));
const UserContextProvider_1 = require("../../context/UserContextProvider");
function PostFleaArticlePage() {
    const [isPostSubmit, setIsPostSubmit] = (0, react_1.useState)(false);
    const [tags, setTags] = (0, react_1.useState)([]);
    const [values, setValues] = (0, react_1.useState)({
        title: '',
        content: '',
        price: '',
        images: [],
    });
    const { user } = (0, UserContextProvider_1.useUserAuth)();
    const router = (0, router_1.useRouter)();
    const { postArticle } = (0, useFleaMarket_1.useFleaMarketPostArticle)();
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const newPost = {
                title: values.title,
                content: values.content,
                price: values.price,
                images: values.images || [],
                tags: tags.map((tag) => tag.tags) || [],
                userId: user === null || user === void 0 ? void 0 : user.id,
            };
            postArticle(newPost);
        }
        catch (error) {
            console.error('Error posting data:', error);
        }
    });
    const onChange = (event) => {
        var _a;
        const { name, value } = event.target;
        setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        setIsPostSubmit(values.title.trim() !== '' &&
            values.content.trim() !== '' &&
            ((_a = values.price) === null || _a === void 0 ? void 0 : _a.trim()) !== '');
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
        <Button_js_1.ArticleButton disabled={!isPostSubmit} label='등록' onClick={handleSubmit}/>
        <FileInput_1.default values={values} setValues={setValues}/>
        <TitleInput_1.default values={values} onChange={onChange}/>
        <ContentInput_1.default values={values} onChange={onChange}/>

        <PriceInput_1.default values={values} onChange={onChange}/>
        <TagsInput_1.default tags={tags} setTags={setTags}/>
      </div>
    </>);
}
