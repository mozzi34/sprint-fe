"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentInput;
const ArticleFormFields_module_css_1 = __importDefault(require("../../styles/ArticleFormFields.module.css"));
function ContentInput({ values, onChange, }) {
    return (<>
      <div className={ArticleFormFields_module_css_1.default.sectionTitle}>상품 소개</div>
      <textarea name='content' placeholder='내용을 입력해 주세요 ' value={values.content} onChange={onChange} className={ArticleFormFields_module_css_1.default.contentInput}/>
    </>);
}
