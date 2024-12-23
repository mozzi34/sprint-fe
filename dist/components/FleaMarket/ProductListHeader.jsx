"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductListHeader;
const SearchForm_1 = __importDefault(require("../../components/FleaMarket/SearchForm"));
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const Fleamarket_module_css_1 = __importDefault(require("../../styles/Fleamarket.module.css"));
const DropDown_1 = __importDefault(require("../../utils/DropDown"));
const react_1 = require("react");
function ProductListHeader({ keyword, setOrderBy, }) {
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
      <div className={Fleamarket_module_css_1.default.headerLayout}>
        <div className={Fleamarket_module_css_1.default.listHeader}>
          {keyword ? (<span className={Fleamarket_module_css_1.default.headerTitle}>검색 결과</span>) : (<span className={Fleamarket_module_css_1.default.headerTitle}>판매 중인 상품</span>)}
        </div>
        <div className={Fleamarket_module_css_1.default.headerMenu}>
          <SearchForm_1.default keyword={keyword}/>

          <link_1.default href='/fleamarket/post'>
            <button className={Fleamarket_module_css_1.default.postButton}>상품 등록하기 </button>
          </link_1.default>

          <div className={Fleamarket_module_css_1.default.dropDownBoxLayout} onClick={handleDropDown}>
            <div className={Fleamarket_module_css_1.default.webDropDownBox}>
              <div className={Fleamarket_module_css_1.default.dropDownBoxText}>{orderByText}</div>
              <image_1.default src='/ic_arrow_down.png' alt='아래 화살표' className={Fleamarket_module_css_1.default.dropDownArrow} width={10} height={10}/>
              <image_1.default src='/btn_mobile_sort.png' alt='모바일 드롭다운 버튼' className={Fleamarket_module_css_1.default.dropDownMobile} width={10} height={10}/>
            </div>

            {isShowDropDown && (<div className={Fleamarket_module_css_1.default.dropDownLayout}>
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
      </div>
    </>);
}
