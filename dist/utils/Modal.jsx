"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModal = AuthModal;
exports.ArticleDeleteModal = ArticleDeleteModal;
const Modal_module_css_1 = __importDefault(require("../styles/Modal.module.css"));
const ic_modal_check_png_1 = __importDefault(require("../../public/ic_modal_check.png"));
const image_1 = __importDefault(require("next/image"));
function AuthModal({ errorMsg, setIsShowModal }) {
    const handleClick = () => {
        setIsShowModal(false);
    };
    return (<div className={Modal_module_css_1.default.layout}>
      <div className={Modal_module_css_1.default.modal}>
        <div className={Modal_module_css_1.default.authModalModalBackColor}>
          <div className={Modal_module_css_1.default.authModalMsg}>{errorMsg}</div>
          <button className={Modal_module_css_1.default.authModalBtn} onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </div>);
}
function ArticleDeleteModal({ onClose, onConfirm }) {
    return (<div className={Modal_module_css_1.default.layout}>
      <div className={Modal_module_css_1.default.modal}>
        <div className={Modal_module_css_1.default.modalBackColor}>
          <div className={Modal_module_css_1.default.modalMain}>
            <image_1.default src={ic_modal_check_png_1.default} alt='체크 이모지' width={24} height={24}/>
            <div className={Modal_module_css_1.default.modalMsg}>정말로 삭제하시겠습니까?</div>
          </div>
          <div className={Modal_module_css_1.default.modalBtns}>
            <button className={Modal_module_css_1.default.modalCancelBtn} onClick={onClose}>
              취소
            </button>
            <button className={Modal_module_css_1.default.modalBtn} onClick={onConfirm}>
              네
            </button>
          </div>
        </div>
      </div>
    </div>);
}
