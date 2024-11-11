"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticleDetailInfo;
const router_1 = require("next/router");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const image_1 = __importDefault(require("next/image"));
const ic_dot_png_1 = __importDefault(require("../../../public/ic_dot.png"));
const DropDown_1 = __importDefault(require("../../utils/DropDown"));
const useFreeBoard_1 = require("../../hooks/useFreeBoard");
const Modal_1 = require("../../utils/Modal");
const UserInfo_1 = require("./UserInfo");
const Article_module_css_1 = __importDefault(require("../../styles/Article.module.css"));
function ArticleDetailInfo({ article, category }) {
    const [isOpenDropDown, setIsOpenDropDown] = (0, react_1.useState)(false);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const { deleteArticle } = (0, useFreeBoard_1.useEditArticle)(id);
    const handleDelete = () => {
        setIsModalOpen(true);
    };
    const onConfirm = () => {
        if (typeof id === 'string') {
            deleteArticle(id); // id가 string일 경우만 호출
            react_hot_toast_1.default.success('삭제가 완료됐습니다!');
            router.push(`/${category}`);
        }
        else {
            // id가 string이 아닌 경우 (예: string[] 또는 undefined) 처리
            react_hot_toast_1.default.error('잘못된 ID입니다.');
        }
    };
    const handleDropDown = (0, react_1.useCallback)(() => {
        setIsOpenDropDown((prev) => !prev);
    }, []);
    const handleEdit = (0, react_1.useCallback)(() => {
        router.push(`/${category}/edit/${id}`);
    }, [id, router, category]);
    if (!article) {
        return <div>loading...</div>;
    }
    return (<>
      {isModalOpen && (<Modal_1.ArticleDeleteModal onClose={() => setIsModalOpen(false)} onConfirm={() => onConfirm()}/>)}

      <div className={Article_module_css_1.default.title}>
        <div className={Article_module_css_1.default.titleText}>{article.title}</div>
        <div className={Article_module_css_1.default.buttonTest}>
          <image_1.default src={ic_dot_png_1.default} alt='수정삭제 버튼' onClick={handleDropDown} className={Article_module_css_1.default.dotImage}/>
          {isOpenDropDown && (<DropDown_1.default firstAction={{
                onClickHandler: handleEdit,
                label: '수정하기',
            }} secondAction={{
                onClickHandler: handleDelete,
                label: '삭제하기',
            }} onClose={() => setIsOpenDropDown(false)}/>)}
        </div>
      </div>
      <UserInfo_1.UserInfo article={article}/>

      <div className={Article_module_css_1.default.content}>{article.content}</div>
      <div>{article.images}</div>
      {/* <Image src={article.image} width={150} height={150} alt='이미지' /> */}
    </>);
}
