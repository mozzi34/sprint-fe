"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagsInput;
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
const image_js_1 = __importDefault(require("next/image.js"));
const ic_tag_delete_png_1 = __importDefault(require("@/public/ic_tag_delete.png"));
function TagsInput({ tags, setTags }) {
    const removeTags = (indexToRemove) => {
        const filter = tags === null || tags === void 0 ? void 0 : tags.filter((_, index) => index !== indexToRemove);
        setTags(filter);
    };
    const addTags = (event) => {
        const inputValue = event.currentTarget.value;
        if (event.key === 'Enter' &&
            inputValue !== '' &&
            !(tags === null || tags === void 0 ? void 0 : tags.includes(inputValue))) {
            setTags((prevTags) => [...prevTags, inputValue]);
            event.currentTarget.value = '';
        }
    };
    return (<>
      <div className={ArticleFormFields_module_css_1.default.sectionTitle}>태그</div>
      <input className={ArticleFormFields_module_css_1.default.titleInput} type='text' onKeyUp={(e) => {
            {
                addTags(e);
            }
        }} placeholder='태그를 입력하세요'/>

      <ul id='tags'>
        {tags === null || tags === void 0 ? void 0 : tags.map((tag, index) => (<li key={index} className={ArticleFormFields_module_css_1.default.hashtags}>
            <span className={ArticleFormFields_module_css_1.default.hashtagTitle}>#{tag}</span>
            <image_js_1.default src={ic_tag_delete_png_1.default} onClick={() => removeTags(index)} alt='remove_tag' className={ArticleFormFields_module_css_1.default.removeIcon}/>
          </li>))}
      </ul>
    </>);
}
