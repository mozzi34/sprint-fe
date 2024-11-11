"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Comments;
const react_1 = require("react");
const Button_1 = require("../../utils/Button");
const CommentList_1 = __importDefault(require("./CommentList"));
const Comment_module_css_1 = __importDefault(require("../../styles/Comment.module.css"));
const useComments_1 = require("../../hooks/useComments");
const useScroll_1 = __importDefault(require("../../hooks/useScroll"));
const router_1 = require("next/router");
const UserContextProvider_1 = require("../../context/UserContextProvider");
function Comments({ category }) {
    const [comment, setComment] = (0, react_1.useState)('');
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const [isSubmit, setIsSubmit] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const { user } = (0, UserContextProvider_1.useUserAuth)();
    const { id: articleId } = router.query;
    const { uniqueComments, fetchNextPage, isLoading, totalCount } = (0, useComments_1.useComments)({
        articleId,
        category,
    });
    const userId = user === null || user === void 0 ? void 0 : user.id;
    const { postCommentMutation, deleteComments } = (0, useComments_1.useEditComment)({
        articleId,
    });
    const handleComment = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = () => {
        if (articleId && comment && typeof articleId === 'string') {
            postCommentMutation.mutate({
                category,
                articleId,
                comment,
                userId,
            });
            setComment('');
        }
        else {
            console.log('Article ID or comment is missing.');
        }
    };
    const { canScroll } = (0, useScroll_1.default)({
        comment,
        isLoading,
        hasMore,
    });
    (0, react_1.useEffect)(() => {
        if (canScroll === true) {
            fetchNextPage();
        }
    }, [canScroll]);
    (0, react_1.useEffect)(() => {
        if (uniqueComments.length >= totalCount) {
            setHasMore(false);
        }
    }, [uniqueComments, totalCount]);
    (0, react_1.useEffect)(() => {
        if (comment) {
            setIsSubmit(true);
        }
        else {
            setIsSubmit(false);
        }
    }, [comment]);
    return (<div className={Comment_module_css_1.default.submit}>
      <div className={Comment_module_css_1.default.comment}>
        {category === 'freeboard' ? '댓글달기' : '문의하기'}
      </div>
      <textarea placeholder={category === 'freeboard'
            ? '댓글을 입력해 주세요.'
            : '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'} value={comment} onChange={handleComment} className={Comment_module_css_1.default.inputComment}/>
      <Button_1.CommentButton disabled={postCommentMutation.isPending || !isSubmit} onClick={handleSubmit} label={'등록'}/>

      <CommentList_1.default articleId={articleId} comments={uniqueComments} onCommentDeleteId={deleteComments} category={category}/>
      {isLoading && <div>Loading...</div>}
    </div>);
}
