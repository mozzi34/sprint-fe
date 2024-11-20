"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = UserInfo;
const Comment_module_css_1 = __importDefault(require("../../styles/Comment.module.css"));
const image_1 = __importDefault(require("next/image"));
const ic_profile_png_1 = __importDefault(require("../../../public/ic_profile.png"));
function DateFormat({ createDate }) {
    const createdDate = new Date(createDate.createdAt);
    const nowDate = new Date();
    const timeDiff = nowDate.getTime() - createdDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor(timeDiff / (1000 * 60));
    if (days > 0)
        return `${days}일 전`;
    if (hours > 0)
        return `${hours}시간 전`;
    if (minutes > 0)
        return `${minutes}분 전`;
    return `방금 전`;
}
function UserInfo({ comment }) {
    return (<>
      <div className={Comment_module_css_1.default.profile}>
        <image_1.default src={ic_profile_png_1.default} alt='프로필 사진' width={32} height={32}/>
        <div className={Comment_module_css_1.default.name}>
          <span className={Comment_module_css_1.default.userName}>{comment.user.nickname}</span>
          <span className={Comment_module_css_1.default.createdDate}>
            <DateFormat createDate={comment}/>
          </span>
        </div>
      </div>
    </>);
}
