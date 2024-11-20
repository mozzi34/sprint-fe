"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BestArticleList;
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const BestArticleList_module_css_1 = __importDefault(require("../../styles/BestArticleList.module.css"));
const DateFormat_1 = __importDefault(require("../../utils/DateFormat"));
const useBestArticleByDevice_1 = __importDefault(require("../../hooks/useBestArticleByDevice"));
function BestArticleList({ articles }) {
    const articlesList = articles === null || articles === void 0 ? void 0 : articles.data;
    const { bestArticles } = (0, useBestArticleByDevice_1.default)({
        articlesList,
        maxProduct: 3,
    });
    if ((bestArticles === null || bestArticles === void 0 ? void 0 : bestArticles.length) === 0) {
        return (<>
        <div className={BestArticleList_module_css_1.default.mainText}>베스트 게시글</div>
        <div className={BestArticleList_module_css_1.default.articleList}>
          <div className={BestArticleList_module_css_1.default.noArticleList}>둘러볼 게시글이 없습니다</div>
        </div>
      </>);
    }
    return (<>
      <div className={BestArticleList_module_css_1.default.mainText}>베스트 게시글</div>
      <div className={BestArticleList_module_css_1.default.articleList}>
        {bestArticles === null || bestArticles === void 0 ? void 0 : bestArticles.map((article) => {
            var _a;
            return (<div key={typeof article.id === 'string' ? article.id : ''} className={BestArticleList_module_css_1.default.list}>
            <link_1.default href={`/freeboard/${article.id}`} className={BestArticleList_module_css_1.default.link}>
              <image_1.default src='/best_badge.png' alt='베스트 뱃지'/>
              <div className={BestArticleList_module_css_1.default.main}>
                <div className={BestArticleList_module_css_1.default.title}>{article.title}</div>
                <image_1.default src='/article_image.png' alt='기본이미지' className={BestArticleList_module_css_1.default.image}/>
              </div>

              <div className={BestArticleList_module_css_1.default.userInfo}>
                <div className={BestArticleList_module_css_1.default.userInfo}>
                  <span className={BestArticleList_module_css_1.default.userName}>{(_a = article.user) === null || _a === void 0 ? void 0 : _a.name}</span>
                  <image_1.default src='/ic_heart.png' alt='하트 아이콘' width={16} height={16} className={BestArticleList_module_css_1.default.heartIcon}/>
                  <span className={BestArticleList_module_css_1.default.favoriteCount}>
                    {article.favorite}
                  </span>
                </div>
                <span className={BestArticleList_module_css_1.default.date}>
                  <DateFormat_1.default createDate={article}/>
                </span>
              </div>
            </link_1.default>
          </div>);
        })}
      </div>
    </>);
}
