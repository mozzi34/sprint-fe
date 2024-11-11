"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FreeBoardPage;
const react_1 = require("react");
const router_1 = require("next/router");
const lodash_1 = require("lodash");
const ArticleList_1 = __importDefault(require("../components/FreeBoard/ArticleList"));
const BestArticleList_1 = __importDefault(require("../components/FreeBoard/BestArticleList"));
const ArticleListHeader_1 = __importDefault(require("../components/FreeBoard/ArticleListHeader"));
const FreeBoard_module_css_1 = __importDefault(require("../styles/FreeBoard.module.css"));
const useFreeBoard_1 = require("../hooks/useFreeBoard");
function FreeBoardPage({ initialArticles }) {
    const [orderBy, setOrderBy] = (0, react_1.useState)('recent');
    const router = (0, router_1.useRouter)();
    const { keyword } = router.query;
    const { articles, loading, hasMore, fetchNextPage, isError, error } = (0, useFreeBoard_1.useFreeBoardArticlesList)({
        orderBy,
        limit: 5,
    });
    const { bestArticles } = (0, useFreeBoard_1.useGetBestArticle)();
    (0, react_1.useEffect)(() => {
        const handleScroll = (0, lodash_1.throttle)(() => {
            if (loading || !hasMore)
                return;
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight - 100) {
                fetchNextPage();
            }
        }, 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading, fetchNextPage]);
    if (isError) {
        return <div>Error: {error === null || error === void 0 ? void 0 : error.message}</div>;
    }
    return (<>
      <div className={FreeBoard_module_css_1.default.body}>
        <BestArticleList_1.default articles={bestArticles}/>
        <ArticleListHeader_1.default keyword={keyword} setOrderBy={setOrderBy}/>
        <ArticleList_1.default articles={articles}/>
        {loading && <div>Loading...</div>}
      </div>
    </>);
}
