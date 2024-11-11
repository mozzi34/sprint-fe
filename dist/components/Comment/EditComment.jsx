"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComment;
const Button_1 = require("../../utils/Button");
const Comment_module_css_1 = __importDefault(require("../../styles/Comment.module.css"));
const useComments_1 = require("../../hooks/useComments");
const react_1 = require("react");
function EditComment({ commentId, articleId, content, setEditId, setIsOpenDropDown, }) {
    const [editComment, setEditComment] = (0, react_1.useState)(content);
    const handleCommentChange = (event) => {
        setEditComment(event.target.value);
    };
    const { editCommentMutation } = (0, useComments_1.useEditComment)({ articleId });
    const handleSubmit = () => {
        editCommentMutation.mutate({ id: commentId, editComment });
        setEditId(null);
        setIsOpenDropDown(false);
    };
    const handleCancelSubmit = () => {
        setEditId(null);
        setIsOpenDropDown(false);
    };
    return (<>
      <div className={Comment_module_css_1.default.editSubmit}>
        <div className={Comment_module_css_1.default.comment}>댓글 수정하기</div>
        <textarea value={editComment} onChange={handleCommentChange} placeholder='댓글을 입력해 주세요.' className={Comment_module_css_1.default.inputComment}/>

        <Button_1.CommentCancelButton disabled={!content} onClick={handleCancelSubmit} label='취소'/>

        <Button_1.CommentButton disabled={!editComment} onClick={handleSubmit} label='수정'/>
      </div>
    </>);
}
