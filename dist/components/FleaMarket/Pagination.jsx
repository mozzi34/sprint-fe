"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pagination;
const Fleamarket_module_css_1 = __importDefault(require("../../styles/Fleamarket.module.css"));
function Pagination({ totalPages, currentPage, setCurrentPage, }) {
    const pageLimit = 5;
    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - pageLimit, 1));
    };
    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + pageLimit, totalPages));
    };
    return (<>
      <div className={Fleamarket_module_css_1.default.paginationLayout}>
        <button disabled={currentPage <= pageLimit} onClick={handlePrev} className={Fleamarket_module_css_1.default.paginationArrowBtn}>
          &lt;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (<button key={startPage + index} onClick={() => setCurrentPage(startPage + index)} className={startPage + index === currentPage
                ? Fleamarket_module_css_1.default.selectBtn
                : Fleamarket_module_css_1.default.noSelectBtn}>
            {startPage + index}
          </button>))}
        <button disabled={currentPage + pageLimit > totalPages} onClick={handleNext} className={Fleamarket_module_css_1.default.paginationArrowBtn}>
          &gt;
        </button>
      </div>
    </>);
}
