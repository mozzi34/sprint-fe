"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentButton = CommentButton;
exports.CommentCancelButton = CommentCancelButton;
exports.ArticleButton = ArticleButton;
exports.NavLogButton = NavLogButton;
const Button_module_css_1 = __importDefault(require("../styles/Button.module.css"));
function CommentButton({ disabled, onClick, label }) {
    return (<div className={Button_module_css_1.default.buttonLayout}>
      <button disabled={disabled} className={!disabled ? Button_module_css_1.default.commentSubmitBtn : Button_module_css_1.default.commentBtn} onClick={onClick} type='button'>
        {label}
      </button>
    </div>);
}
function CommentCancelButton({ onClick, label }) {
    return (<>
      <div className={Button_module_css_1.default.buttonLayout}>
        <button className={Button_module_css_1.default.cancelBtn} onClick={onClick} type='button'>
          {label}
        </button>
      </div>
    </>);
}
function ArticleButton({ disabled, onClick, label }) {
    return (<>
      <div className={Button_module_css_1.default.buttonLayout}>
        <button disabled={disabled} className={!disabled ? Button_module_css_1.default.articleSubmitBtn : Button_module_css_1.default.articleBtn} onClick={onClick} type='button'>
          {label}
        </button>
      </div>
    </>);
}
function NavLogButton({ onClick, label }) {
    return (<>
      <div className={Button_module_css_1.default.buttonLayout}>
        <button className={Button_module_css_1.default.navBtn} onClick={onClick} type='button'>
          {label}
        </button>
      </div>
    </>);
}
