"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticleList;
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const DateFormat_1 = __importDefault(require("../../utils/DateFormat"));
const ArticleList_module_css_1 = __importDefault(require("../../styles/ArticleList.module.css"));
function ArticleList({ articles }) {
    if (articles.length === 0) {
        return (<div className={ArticleList_module_css_1.default.articleList}>
        <div className={ArticleList_module_css_1.default.noArticleList}>둘러볼 게시글이 없습니다</div>
      </div>);
    }
    return (<>
      <div className={ArticleList_module_css_1.default.articleList}>
        {articles.map((article) => {
            var _a;
            return (<div key={typeof article.id === 'string' ? article.id : ''} className={ArticleList_module_css_1.default.list}>
            <link_1.default href={`/freeboard/${article.id}`} className={ArticleList_module_css_1.default.link}>
              <div className={ArticleList_module_css_1.default.main}>
                <span className={ArticleList_module_css_1.default.title}>
                  {article.title}
                  <span className={ArticleList_module_css_1.default.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <image_1.default src='/article_image.png' alt='기본이미지'/>
              </div>

              <div className={ArticleList_module_css_1.default.userInfo}>
                <div>
                  <image_1.default src='/ic_profile.png' alt='프로필 이미지'/>
                  <span className={ArticleList_module_css_1.default.userName}>{(_a = article.user) === null || _a === void 0 ? void 0 : _a.name}</span>
                  <span className={ArticleList_module_css_1.default.date}>
                    <DateFormat_1.default createDate={article}/>
                  </span>
                </div>
                <div className={ArticleList_module_css_1.default.favorite}>
                  <image_1.default src='/ic_heart.png' alt='하트 아이콘'/>
                  <span className={ArticleList_module_css_1.default.favoriteCount}>
                    {Math.max(article.favorite, 0)}
                  </span>
                </div>
              </div>
            </link_1.default>
          </div>);
        })}
      </div>
    </>);
}
