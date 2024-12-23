"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TitleInput;
const ArticleFormFields_module_css_1 = __importDefault(require("../../styles/ArticleFormFields.module.css"));
function TitleInput({ values, onChange, }) {
    return (<>
      <div className={ArticleFormFields_module_css_1.default.sectionTitle}>상품명</div>
      <input name='title' placeholder='상품명을 입력해 주세요' value={values.title} onChange={onChange} className={ArticleFormFields_module_css_1.default.titleInput}/>
    </>);
}
