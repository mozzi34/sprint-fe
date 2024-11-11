"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticlePage;
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const image_1 = __importDefault(require("next/image"));
const btn_back_png_1 = __importDefault(require("@/public/btn_back.png"));
const Comments_1 = __importDefault(require("../../components/Comment/Comments"));
const ArticleDetail_1 = __importDefault(require("../../components/FleaMarket/ArticleDetail"));
const Article_module_css_1 = __importDefault(require("@/styles/Article.module.css"));
const useFleaMarket_1 = require("../../hooks/useFleaMarket");
const UserContextProvider_1 = require("../../context/UserContextProvider");
function ArticlePage() {
    const router = (0, router_1.useRouter)();
    const id = router.query.id;
    const { user } = (0, UserContextProvider_1.useUserAuth)();
    const category = 'fleamarket';
    const { isLoading, data } = (0, useFleaMarket_1.useGetArticleDetail)({
        id: id,
        userId: user === null || user === void 0 ? void 0 : user.id,
    });
    // useEffect(() => {
    //   if (!user) {
    //     router.push('/login');
    //   }
    // }, [router]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (<>
      <div className={Article_module_css_1.default.article}>
        <ArticleDetail_1.default article={data === null || data === void 0 ? void 0 : data.article} isLiked={data === null || data === void 0 ? void 0 : data.isLiked} category={category}/>
        <Comments_1.default category={category}/>

        <link_1.default href={'/fleamarket'}>
          <image_1.default src={btn_back_png_1.default} alt='목록으로 돌아가기 버튼' className={Article_module_css_1.default.backBtn} priority/>
        </link_1.default>
      </div>
    </>);
}
