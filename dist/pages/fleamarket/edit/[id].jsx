"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditArticlePage;
const react_1 = require("react");
const router_1 = require("next/router");
const react_2 = __importDefault(require("react"));
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
const Button_1 = require("../../../utils/Button");
const TitleInput_1 = __importDefault(require("../../../components/Post/TitleInput"));
const FileInput_1 = __importDefault(require("../../../components/Post/FileInput"));
const PriceInput_1 = __importDefault(require("../../../components/Post/PriceInput"));
const TagsInput_1 = __importDefault(require("../../../components/Post/TagsInput"));
const ContentInput_1 = __importDefault(require("../../../components/Post/ContentInput"));
const useFleaMarket_1 = require("../../../hooks/useFleaMarket");
const UserContextProvider_1 = require("../../../context/UserContextProvider");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
// export interface User {
//   userId: string | undefined;
// }
function EditArticlePage() {
    const { user } = (0, UserContextProvider_1.useUserAuth)();
    const router = (0, router_1.useRouter)();
    const [canSubmit, setCanSubmit] = (0, react_1.useState)(true);
    const [tags, setTags] = (0, react_1.useState)([]);
    const { id } = router.query;
    const { data, isLoading } = (0, useFleaMarket_1.useGetArticleDetail)({
        id: id,
        userId: user === null || user === void 0 ? void 0 : user.id,
    });
    const { editFleaMarketArticle } = (0, useFleaMarket_1.useFleaMarketEditArticle)({ id });
    const [values, setValues] = (0, react_1.useState)({
        title: '',
        content: '',
        price: '',
        images: [],
    });
    const handleSubmit = () => {
        editFleaMarketArticle.mutate({
            id: id,
            title: values.title,
            content: values.content,
            price: values.price,
            images: values.images || [],
            tags: tags.map((tag) => tag.tags) || [],
        });
    };
    const onChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        setCanSubmit(values.title.trim() !== '' &&
            values.content.trim() !== '' &&
            String(values.price).trim() !== '');
    };
    (0, react_1.useEffect)(() => {
        if (data) {
            setValues({
                title: data.article.title,
                content: data.article.content,
                price: data.article.price,
                images: data.article.images,
            });
            setTags(data.article.tags);
        }
    }, [data]);
    (0, react_1.useEffect)(() => {
        if (data && user) {
            if (!user) {
                router.push('/login');
            }
            else if (user.id !== data.article.userId) {
                react_hot_toast_1.default.error('권한이 없습니다!');
                router.push(`/fleamarket/${id}`);
            }
        }
    }, [user, router, data]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (<>
      <div className={ArticleFormFields_module_css_1.default.postLayout}>
        <div className={ArticleFormFields_module_css_1.default.header}>
          <span className={ArticleFormFields_module_css_1.default.title}>게시물 수정</span>
        </div>
        <Button_1.ArticleButton disabled={!canSubmit} label='등록' onClick={handleSubmit}/>
        <TitleInput_1.default values={values} onChange={onChange}/>
        <ContentInput_1.default values={values} onChange={onChange}/>
        <FileInput_1.default values={values} setValues={setValues}/>
        <PriceInput_1.default values={values} onChange={onChange}/>
        <TagsInput_1.default tags={tags} setTags={setTags}/>
      </div>
    </>);
}
