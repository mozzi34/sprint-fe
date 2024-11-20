"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditArticlePage;
const react_1 = __importStar(require("react"));
const router_1 = require("next/router");
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
const Button_1 = require("../../../utils/Button");
const TitleInput_1 = __importDefault(require("../../../components/Post/TitleInput"));
const ContentInput_1 = __importDefault(require("../../../components/Post/ContentInput"));
const useFreeBoard_1 = require("../../../hooks/useFreeBoard");
const AuthProvider_1 = require("../../../utils/AuthProvider");
function EditArticlePage() {
    const router = (0, router_1.useRouter)();
    const { user } = (0, AuthProvider_1.useAuth)(true);
    const [isSubmit, setIsSubmit] = (0, react_1.useState)(true);
    const [values, setValues] = (0, react_1.useState)({
        title: '',
        content: '',
        images: [],
    });
    const { id } = router.query;
    const { data, isLoading } = id && typeof id === 'string'
        ? (0, useFreeBoard_1.useGetArticle)(id)
        : { data: null, isLoading: true };
    const { editFreeBoardArticle } = (0, useFreeBoard_1.useEditArticle)(id);
    const handleSubmit = () => {
        if (typeof id === 'string') {
            editFreeBoardArticle.mutate({
                id: id, // id가 string일 경우에만 호출
                title: values.title,
                content: values.content,
            });
        }
        const onChange = (event) => {
            const { name, value } = event.target;
            setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
            setIsSubmit(values.title.trim() !== '' && values.content.trim() !== '');
        };
        (0, react_1.useEffect)(() => {
            if (data) {
                setValues({
                    title: data.title,
                    content: data.content,
                    images: data.images,
                });
            }
        }, [data]);
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return (<>
        <div className={ArticleFormFields_module_css_1.default.postLayout}>
          <div className={ArticleFormFields_module_css_1.default.header}>
            <span className={ArticleFormFields_module_css_1.default.title}>게시물 수정</span>
          </div>
          <Button_1.ArticleButton disabled={!isSubmit} label='수정' onClick={handleSubmit}/>
          <TitleInput_1.default values={values} onChange={onChange}/>
          <ContentInput_1.default values={values} onChange={onChange}/>
        </div>
      </>);
    };
}
