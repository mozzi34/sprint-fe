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
exports.ArticleDetailUserInfo = ArticleDetailUserInfo;
const ArticleDetail_module_css_1 = __importDefault(require("@/styles/ArticleDetail.module.css"));
const image_1 = __importDefault(require("next/image"));
const heartLine_png_1 = __importDefault(require("@/public/heartLine.png"));
const ic_profile_png_1 = __importDefault(require("@/public/ic_profile.png"));
const ic_heart_png_1 = __importDefault(require("@/public/ic_heart.png"));
const ic_heart_full_png_1 = __importDefault(require("@/public/ic_heart_full.png"));
const DateFormat_1 = __importDefault(require("../../utils/DateFormat"));
const react_1 = __importDefault(require("react"));
const favorite_1 = require("../../utils/api/favorite");
const react_2 = require("react");
function ArticleDetailUserInfo({ article, isLiked, user, }) {
    var _a;
    const [isFavorite, setIsFavorite] = (0, react_2.useState)(isLiked);
    const [favoriteCount, setFavoriteCount] = (0, react_2.useState)(Math.min((article === null || article === void 0 ? void 0 : article.favoriteCount) || 0));
    const [values, setValues] = (0, react_2.useState)({ articleId: '', userId: '' });
    const handleFavorite = () => __awaiter(this, void 0, void 0, function* () {
        setIsFavorite((prev) => !prev);
        if (!isFavorite) {
            setFavoriteCount((prev) => prev + 1);
            yield (0, favorite_1.postFavoriteApi)({
                articleId: values.articleId,
            });
        }
        else {
            setFavoriteCount((prev) => Math.max(prev - 1, 0));
            yield (0, favorite_1.deleteFavoriteApi)({
                articleId: values.articleId,
                userId: values.userId,
            });
        }
    });
    (0, react_2.useEffect)(() => {
        if (article && user) {
            if (typeof article.id === 'string') {
                setValues({
                    articleId: article.id,
                    userId: user.id,
                });
            }
        }
    }, [article, user]);
    return (<>
      <div className={ArticleDetail_module_css_1.default.profile}>
        <div className={ArticleDetail_module_css_1.default.userInfo}>
          <image_1.default src={ic_profile_png_1.default} alt='프로필 사진' width={40} height={40}/>
          <div className={ArticleDetail_module_css_1.default.articleInfo}>
            <p className={ArticleDetail_module_css_1.default.userName}>{(_a = article.user) === null || _a === void 0 ? void 0 : _a.nickname}</p>
            <span className={ArticleDetail_module_css_1.default.date}>
              <div className={ArticleDetail_module_css_1.default.profileIcon}>
                <DateFormat_1.default createDate={article}/>
              </div>
            </span>
          </div>
        </div>

        <div className={ArticleDetail_module_css_1.default.heartCount}>
          <image_1.default src={heartLine_png_1.default} alt='선' className={ArticleDetail_module_css_1.default.line}/>
          <div className={ArticleDetail_module_css_1.default.heart}>
            <image_1.default src={isFavorite ? ic_heart_full_png_1.default : ic_heart_png_1.default} width={26.8} height={23.3} alt='하트 아이콘' className={ArticleDetail_module_css_1.default.heartIcon} onClick={() => handleFavorite()}/>
            <span className={ArticleDetail_module_css_1.default.heartCount}>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </>);
}
