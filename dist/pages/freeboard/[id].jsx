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
exports.default = ArticlePage;
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const image_1 = __importDefault(require("next/image"));
const btn_back_png_1 = __importDefault(require("../../../public/btn_back.png"));
const Comments_1 = __importDefault(require("../../components/Comment/Comments"));
const ArticleDetailInfo_1 = __importDefault(require("../../components/ArticleDetail/ArticleDetailInfo"));
const Article_module_css_1 = __importDefault(require("../../styles/Article.module.css"));
const useFreeBoard_1 = require("../../hooks/useFreeBoard");
const react_1 = require("react");
function ArticlePage() {
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const category = 'freeboard';
    const { isLoading, data: article } = typeof id === 'string'
        ? (0, useFreeBoard_1.useGetArticle)(id)
        : { isLoading: true, data: null };
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
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (<>
      <div className={Article_module_css_1.default.article}>
        <ArticleDetailInfo_1.default article={article} category={category}/>
        <Comments_1.default category={category}/>

        <link_1.default href={'/freeboard'}>
          <image_1.default src={btn_back_png_1.default} alt='목록으로 돌아가기 버튼' className={Article_module_css_1.default.backBtn} priority/>
        </link_1.default>
      </div>
    </>);
}
