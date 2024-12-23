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
exports.getServerSideProps = void 0;
exports.default = FleaMarket;
const react_1 = require("react");
const router_1 = require("next/router");
const ProductList_1 = __importDefault(require("../components/FleaMarket/ProductList"));
const BestProductList_1 = __importDefault(require("../components/FleaMarket/BestProductList"));
const ProductListHeader_1 = __importDefault(require("../components/FleaMarket/ProductListHeader"));
const fleaMarketApi_1 = require("../utils/api/fleaMarketApi");
const FreeBoard_module_css_1 = __importDefault(require("../styles/FreeBoard.module.css"));
const useFleaMarket_1 = require("../hooks/useFleaMarket");
const Pagination_1 = __importDefault(require("../components/FleaMarket/Pagination"));
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword = '', sort = 'recent', page = 1, } = context.query;
    try {
        const articles = yield (0, fleaMarketApi_1.fetchFleaMarketApi)({
            keyword,
            sort,
            page,
        });
        return {
            props: {
                initialArticles: articles.data || [],
            },
        };
    }
    catch (error) {
        console.error('Error fetching article:', error);
        return {
            props: {
                initialArticles: [],
            },
        };
    }
});
exports.getServerSideProps = getServerSideProps;
function FleaMarket() {
    const [orderBy, setOrderBy] = (0, react_1.useState)('recent');
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const router = (0, router_1.useRouter)();
    const { keyword } = router.query;
    const { articles, totalPages, isLoading, isError, error } = (0, useFleaMarket_1.useGetArticleList)({
        page: currentPage,
        sort: orderBy,
        keyword,
    });
    const { bestArticles } = (0, useFleaMarket_1.useGetBestArticle)();
    if (isError) {
        return <div>Error: {error === null || error === void 0 ? void 0 : error.message}</div>;
    }
    return (<>
      <div className={FreeBoard_module_css_1.default.body}>
        <BestProductList_1.default articles={bestArticles}/>
        <ProductListHeader_1.default keyword={keyword} setOrderBy={setOrderBy}/>
        <ProductList_1.default articles={articles}/>
        <Pagination_1.default totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        {isLoading && <div>Loading...</div>}
      </div>
    </>);
}
