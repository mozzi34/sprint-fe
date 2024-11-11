"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleListUserInfo = ArticleListUserInfo;
const image_1 = __importDefault(require("next/image"));
const Fleamarket_module_css_1 = __importDefault(require("../../styles/Fleamarket.module.css"));
function ArticleListUserInfo({ article }) {
    return (<>
      <div className={Fleamarket_module_css_1.default.userInfo}>
        {/* <div> */}
        {/* <Image src={profileIcon} alt='프로필 이미지' width={32} height={32} /> */}
        {/* <span className={styles.userName}>{article.user.name}</span> */}
        {/* <span className={styles.date}>
            <DateFormat createDate={article} />
          </span> */}
        {/* </div> */}
        <div className={Fleamarket_module_css_1.default.favorite}>
          <image_1.default src='/ic_heart.png' alt='하트 아이콘' width={16} height={16}/>
          <span className={Fleamarket_module_css_1.default.favoriteCount}>
            {Math.max(article.favoriteCount, 0)}
          </span>
        </div>
      </div>
    </>);
}
