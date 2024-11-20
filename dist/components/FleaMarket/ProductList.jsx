"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductList;
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const Fleamarket_module_css_1 = __importDefault(require("../../styles/Fleamarket.module.css"));
const ArticleListUserInfo_1 = require("./ArticleListUserInfo");
function ProductList({ articles }) {
    if ((articles === null || articles === void 0 ? void 0 : articles.length) === 0) {
        return (<div className={Fleamarket_module_css_1.default.articleList}>
        <div className={Fleamarket_module_css_1.default.noArticleList}>둘러볼 상품이 없습니다</div>
      </div>);
    }
    return (<>
      <div className={Fleamarket_module_css_1.default.articleList}>
        {articles === null || articles === void 0 ? void 0 : articles.map((article) => (<div key={typeof article.id === 'string' ? article.id : ''} className={Fleamarket_module_css_1.default.list}>
            <link_1.default href={`/fleamarket/${article.id}`} className={Fleamarket_module_css_1.default.link}>
              <image_1.default src={article.images && article.images.length > 0
                ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
                : '/article_image.png'} alt='기본이미지' width={221} height={221}/>

              <div className={Fleamarket_module_css_1.default.productInfo}>
                <span className={Fleamarket_module_css_1.default.title}>
                  {article.title}
                  <span className={Fleamarket_module_css_1.default.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <div className={Fleamarket_module_css_1.default.price}>
                  {(article === null || article === void 0 ? void 0 : article.price)
                ? article.price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '가격 정보 없음'}
                  원
                </div>
                <ArticleListUserInfo_1.ArticleListUserInfo article={article}/>
              </div>
            </link_1.default>
          </div>))}
      </div>
    </>);
}
