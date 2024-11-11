"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DropDown;
const DropDown_module_css_1 = __importDefault(require("../styles/DropDown.module.css"));
const react_1 = require("react");
function DropDown({ firstAction, secondAction, onClose, }) {
    const dropDownRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    return (<div className={DropDown_module_css_1.default.dropDown} ref={dropDownRef}>
      <div className={firstAction.label === '최신순'
            ? DropDown_module_css_1.default.dropDownRecent
            : DropDown_module_css_1.default.dropDownEdit} onClick={firstAction.onClickHandler}>
        {firstAction.label}
      </div>
      <div className={firstAction.label === '최신순'
            ? DropDown_module_css_1.default.dropDownFavorite
            : DropDown_module_css_1.default.dropDownDelete} onClick={secondAction.onClickHandler}>
        {secondAction.label}
      </div>
    </div>);
}
