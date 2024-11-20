"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PriceInput;
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
function PriceInput({ values, onChange, }) {
    return (<>
      <div className={ArticleFormFields_module_css_1.default.sectionTitle}>판매가격</div>
      <input name='price' placeholder='판매 가격을 입력해 주세요' type='number' value={values.price} onChange={onChange} className={ArticleFormFields_module_css_1.default.titleInput}/>
    </>);
}
