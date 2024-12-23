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
exports.UserInfo = UserInfo;
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const heartLine_png_1 = __importDefault(require("../../../public/heartLine.png"));
const ic_profile_png_1 = __importDefault(require("../../../public/ic_profile.png"));
const ic_heart_png_1 = __importDefault(require("../../../public/ic_heart.png"));
const ic_heart_full_png_1 = __importDefault(require("../../../public/ic_heart_full.png"));
const DateFormat_1 = __importDefault(require("../../utils/DateFormat"));
const favorite_1 = require("../../utils/api/favorite");
const Article_module_css_1 = __importDefault(require("../../styles/Article.module.css"));
function UserInfo({ article }) {
    var _a;
    const [isFavorite, setIsFavorite] = (0, react_1.useState)(false);
    const [favoriteCount, setFavoriteCount] = (0, react_1.useState)(Math.max(article === null || article === void 0 ? void 0 : article.favorite, 0));
    const articleId = (article === null || article === void 0 ? void 0 : article.id) || '';
    const handleFavorite = (articleId) => __awaiter(this, void 0, void 0, function* () {
        setIsFavorite((prev) => !prev);
        if (!isFavorite) {
            setFavoriteCount((prev) => Math.max(prev + 1, 0));
            yield (0, favorite_1.postFavoriteApi)(articleId);
        }
        else {
            setFavoriteCount((prev) => Math.max(prev - 1, 0));
            yield (0, favorite_1.deleteFavoriteApi)(articleId);
        }
    });
    return (<>
      <div className={Article_module_css_1.default.profile}>
        <image_1.default src={ic_profile_png_1.default} alt='프로필 사진' width={40} height={40}/>
        <p className={Article_module_css_1.default.userName}>{(_a = article.user) === null || _a === void 0 ? void 0 : _a.name}</p>
        <span className={Article_module_css_1.default.date}>
          <div className={Article_module_css_1.default.profileIcon}>
            <DateFormat_1.default createDate={article}/>
          </div>
        </span>
        <image_1.default src={heartLine_png_1.default} alt='선' className={Article_module_css_1.default.line}/>
        <div className={Article_module_css_1.default.heart}>
          <image_1.default src={isFavorite ? ic_heart_full_png_1.default : ic_heart_png_1.default} alt='하트 아이콘' width={26.8} height={23.3} onClick={() => handleFavorite(articleId)}/>
          <span className={Article_module_css_1.default.heartCount}>{favoriteCount}</span>
        </div>
      </div>
    </>);
}
