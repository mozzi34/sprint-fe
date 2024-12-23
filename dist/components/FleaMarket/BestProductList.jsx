"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BestProductList;
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const BestProductList_module_css_1 = __importDefault(require("../../styles/BestProductList.module.css"));
const useBestArticleByDevice_1 = __importDefault(require("../../hooks/useBestArticleByDevice"));
function BestProductList({ articles }) {
    const articlesList = (articles === null || articles === void 0 ? void 0 : articles.map((item) => item.data).flat()) || [];
    const { bestArticles } = (0, useBestArticleByDevice_1.default)({
        articlesList,
        maxProduct: 4,
    });
    if ((bestArticles === null || bestArticles === void 0 ? void 0 : bestArticles.length) === 0) {
        return (<>
        <div className={BestProductList_module_css_1.default.mainText}>베스트 게시글</div>
        <div className={BestProductList_module_css_1.default.articleList}>
          <div className={BestProductList_module_css_1.default.noArticleList}>둘러볼 게시글이 없습니다</div>
        </div>
      </>);
    }
    return (<>
      <div className={BestProductList_module_css_1.default.mainText}>베스트 상품</div>
      <div className={BestProductList_module_css_1.default.articleList}>
        {bestArticles === null || bestArticles === void 0 ? void 0 : bestArticles.map((article) => (<div key={typeof article.id === 'string' ? article.id : ''} className={BestProductList_module_css_1.default.list}>
            <link_1.default href={`/fleamarket/${article.id}`} className={BestProductList_module_css_1.default.link}>
              <image_1.default src={article.images && article.images.length > 0
                ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
                : '/article_image.png'} alt='기본이미지' className={BestProductList_module_css_1.default.productImage} width={282} height={282}/>
              <div className={BestProductList_module_css_1.default.productInfo}>
                <div className={BestProductList_module_css_1.default.title}>{article.title}</div>
                <div className={BestProductList_module_css_1.default.price}>
                  {(article === null || article === void 0 ? void 0 : article.price)
                ? article.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '가격 정보 없음'}
                  원
                </div>
                <div className={BestProductList_module_css_1.default.favorite}>
                  <image_1.default src='/ic_heart.png' alt='하트 아이콘' width={16} height={16} className={BestProductList_module_css_1.default.heartIcon}/>
                  <div className={BestProductList_module_css_1.default.favoriteCount}>
                    {article.favoriteCount}
                  </div>
                </div>
              </div>
            </link_1.default>
          </div>))}
      </div>
    </>);
}
