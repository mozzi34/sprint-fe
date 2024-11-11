"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticleListHeader;
const SearchForm_1 = __importDefault(require("../../components/FreeBoard/SearchForm"));
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const FreeBoard_module_css_1 = __importDefault(require("../../styles/FreeBoard.module.css"));
const DropDown_1 = __importDefault(require("../../utils/DropDown"));
const react_1 = require("react");
function ArticleListHeader({ keyword, setOrderBy, }) {
    const [isShowDropDown, setIsShowDropDown] = (0, react_1.useState)(false);
    const [orderByText, setOrderByText] = (0, react_1.useState)('최신순');
    const handleDropDown = () => {
        setIsShowDropDown((prev) => !prev);
    };
    const handleOrderByClick = (orderBy) => {
        setOrderBy(orderBy);
        setOrderByText(orderBy === 'recent' ? '최신순' : '좋아요순');
    };
    return (<>
      <div className={FreeBoard_module_css_1.default.listHeader}>
        {keyword ? (<span className={FreeBoard_module_css_1.default.title}>검색 결과</span>) : (<span className={FreeBoard_module_css_1.default.title}>게시글</span>)}
        <link_1.default href='/freeboard/post'>
          <image_1.default src='/post_btn.png' alt='글쓰기 버튼' width={10} height={10}/>
        </link_1.default>
      </div>
      <div className={FreeBoard_module_css_1.default.menu}>
        <SearchForm_1.default keyword={keyword}/>
        <div className={FreeBoard_module_css_1.default.dropDownBoxLayout} onClick={handleDropDown}>
          <div className={FreeBoard_module_css_1.default.webDropDOnwBox}>
            <div className={FreeBoard_module_css_1.default.dropDownBoxText}>{orderByText}</div>
            <image_1.default src='/ic_arrow_down.png' alt='아래 화살표' className={FreeBoard_module_css_1.default.dropDownArrow} width={10} height={10}/>
          </div>
          <image_1.default src='/btn_mobile_sort.png' alt='모바일 드롭다운 버튼' className={FreeBoard_module_css_1.default.dropDownMobile} width={10} height={10}/>
          {isShowDropDown && (<div className={FreeBoard_module_css_1.default.dropDownLayout}>
              <DropDown_1.default firstAction={{
                onClickHandler: () => handleOrderByClick('recent'),
                label: '최신순',
            }} secondAction={{
                onClickHandler: () => handleOrderByClick('favorite'),
                label: '좋아요순',
            }} onClose={() => setIsShowDropDown(false)}/>
            </div>)}
        </div>
      </div>
    </>);
}
