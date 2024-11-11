"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticleDetailInfo;
const router_1 = require("next/router");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
const ArticleDetail_module_css_1 = __importDefault(require("@/styles/ArticleDetail.module.css"));
const ic_dot_png_1 = __importDefault(require("@/public/ic_dot.png"));
const DropDown_1 = __importDefault(require("../../utils/DropDown"));
const testImage_png_1 = __importDefault(require("@/public/testImage.png"));
const useFleaMarket_1 = require("../../hooks/useFleaMarket");
const ArticleDetailUserInfo_1 = require("./ArticleDetailUserInfo");
const Modal_1 = require("../../utils/Modal");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const UserContextProvider_1 = require("../../context/UserContextProvider");
function ArticleDetailInfo({ isLiked, article, category, }) {
    var _a;
    const [isOenDropDown, setIsOpenDropDown] = (0, react_1.useState)(false);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const { user, isPending } = (0, UserContextProvider_1.useUserAuth)();
    const { deleteFleaMArketArticle } = (0, useFleaMarket_1.useFleaMarketEditArticle)({ id });
    let formattedPrice = (article === null || article === void 0 ? void 0 : article.price)
        ? article.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        : '가격 정보 없음';
    const handleDelete = () => {
        setIsModalOpen(true);
    };
    const onConfirm = () => {
        if (typeof id === 'string') {
            deleteFleaMArketArticle(id);
            react_hot_toast_1.default.success('삭제가 완료됐습니다!');
            router.push(`/${category}`);
        }
    };
    const handleDropDown = (0, react_1.useCallback)(() => {
        if (article.userId === (user === null || user === void 0 ? void 0 : user.id)) {
            setIsOpenDropDown((prev) => !prev);
        }
        else {
            setIsOpenDropDown(false);
        }
    }, []);
    const handleEdit = (0, react_1.useCallback)(() => {
        if (category === 'freeboard') {
            router.push(`/freeboard/edit/${id}`);
        }
        else {
            router.push(`/fleamarket/edit/${id}`);
        }
    }, [id, router, category]);
    if (!article) {
        return <div>loading...</div>;
    }
    return (<>
      {isModalOpen && (<Modal_1.ArticleDeleteModal onClose={() => setIsModalOpen(false)} onConfirm={() => onConfirm()}/>)}
      <div className={ArticleDetail_module_css_1.default.layout}>
        <image_1.default src={article.images && article.images.length > 0
            ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
            : testImage_png_1.default} width={486} height={486} alt='이미지' className={ArticleDetail_module_css_1.default.itemImage}/>

        <div className={ArticleDetail_module_css_1.default.information}>
          <div className={ArticleDetail_module_css_1.default.titleOption}>
            <div className={ArticleDetail_module_css_1.default.titleText}>{article.title}</div>
            <div className={ArticleDetail_module_css_1.default.buttonTest}>
              <image_1.default src={ic_dot_png_1.default} alt='수정삭제 버튼' onClick={handleDropDown} className={ArticleDetail_module_css_1.default.dotImage} width={24} height={24}/>
              {isOenDropDown && (<DropDown_1.default firstAction={{
                onClickHandler: handleEdit,
                label: '수정하기',
            }} secondAction={{
                onClickHandler: handleDelete,
                label: '삭제하기',
            }} onClose={() => setIsOpenDropDown(false)}/>)}
            </div>
          </div>
          <div className={ArticleDetail_module_css_1.default.itemPrice}>{formattedPrice}원</div>
        </div>

        <div className={ArticleDetail_module_css_1.default.itemInformation}>
          <div className={ArticleDetail_module_css_1.default.itemTitleText}>상품 소개</div>
          <div className={ArticleDetail_module_css_1.default.itemContent}>
            <pre>{article.content} </pre>
          </div>

          <div className={ArticleDetail_module_css_1.default.itemTitleText}>상품 태그</div>
          {(_a = article.tags) === null || _a === void 0 ? void 0 : _a.map((tag, index) => (<li key={tag} className={ArticleDetail_module_css_1.default.hashtags}>
              <span className={ArticleDetail_module_css_1.default.hashtagTitle}># {tag}</span>
            </li>))}
        </div>

        <ArticleDetailUserInfo_1.ArticleDetailUserInfo article={article} isLiked={isLiked} user={user}/>
      </div>
    </>);
}
