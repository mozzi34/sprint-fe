"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
const codeit_png_1 = __importDefault(require("../../public/codeit.png"));
const ic_facebook_png_1 = __importDefault(require("../../public/sns_icon/ic_facebook.png"));
const ic_youtuve_png_1 = __importDefault(require("../../public/sns_icon/ic_youtuve.png"));
const ic_insta_png_1 = __importDefault(require("../../public/sns_icon/ic_insta.png"));
const ic_twitter_png_1 = __importDefault(require("../../public/sns_icon/ic_twitter.png"));
const image_1 = __importDefault(require("next/image"));
const Footer_module_css_1 = __importDefault(require("../styles/Footer.module.css"));
function Footer() {
    return (<>
      <div className={Footer_module_css_1.default.footer}>
        <div className={Footer_module_css_1.default.footerList}>
          <image_1.default src={codeit_png_1.default} alt='코드잇 로고' className={Footer_module_css_1.default.codeitLogo}/>
          <div className={Footer_module_css_1.default.textList}>
            <span className={Footer_module_css_1.default.text}>Privacy Policy</span>
            <span className={Footer_module_css_1.default.text}>FAQ</span>
          </div>
          <div className={Footer_module_css_1.default.snsLogo}>
            <image_1.default src={ic_facebook_png_1.default} alt='코드잇 로고'/>
            <image_1.default src={ic_twitter_png_1.default} alt='트위터 로고'/>
            <image_1.default src={ic_youtuve_png_1.default} alt='유튜브 로고'/>
            <image_1.default src={ic_insta_png_1.default} alt='인스타 로고'/>
          </div>
        </div>
        <image_1.default src={codeit_png_1.default} alt='코드잇 로고' className={Footer_module_css_1.default.codeitLogoMobile}/>
      </div>
    </>);
}
