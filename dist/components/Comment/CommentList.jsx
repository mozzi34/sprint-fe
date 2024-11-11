"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentList;
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const EditComment_1 = __importDefault(require("./EditComment"));
const DropDown_1 = __importDefault(require("../../utils/DropDown"));
const ic_dot_png_1 = __importDefault(require("../../../public/ic_dot.png"));
const no_comment_png_1 = __importDefault(require("../../../public/no_comment.png"));
const no_ask_png_1 = __importDefault(require("../../../public/no_ask.png"));
const UserInfo_1 = require("./UserInfo");
const UserContextProvider_1 = require("../../context/UserContextProvider");
const Comment_module_css_1 = __importDefault(require("../../styles/Comment.module.css"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_2 = __importDefault(require("react"));
function CommentList({ articleId, comments, onCommentDeleteId, category, }) {
    const [commentId, setCommentId] = (0, react_1.useState)('');
    const [isOpenDropDown, setIsOpenDropDown] = (0, react_1.useState)(false);
    const [editId, setEditId] = (0, react_1.useState)(null);
    const { user } = (0, UserContextProvider_1.useUserAuth)();
    const handleDropDown = (event) => {
        if ((user === null || user === void 0 ? void 0 : user.id) === event.userId) {
            setIsOpenDropDown((prev) => !prev);
            setCommentId(event.id);
        }
        else {
            setIsOpenDropDown(false);
        }
    };
    function handleDelete() {
        onCommentDeleteId(commentId);
        react_hot_toast_1.default.success('삭제가 완료됐습니다!');
        setIsOpenDropDown(false);
    }
    function handleEdit(event) {
        const targetElement = event.target;
        const editId = targetElement.dataset.id;
        if (editId) {
            setEditId(editId);
        }
    }
    if (comments.length === 0) {
        return (<image_1.default src={category === 'freeboard' ? no_comment_png_1.default : no_ask_png_1.default} alt='댓글이 없습니다' className={Comment_module_css_1.default.noComment} priority/>);
    }
    return (<>
      <div className={Comment_module_css_1.default.commentListLayout}>
        {comments.map((comment) => (<div key={comment.id}>
            <div>
              {editId === comment.id ? (<EditComment_1.default commentId={comment.id} articleId={articleId} content={comment.content} setEditId={setEditId} setIsOpenDropDown={setIsOpenDropDown}/>) : (<>
                  <div className={Comment_module_css_1.default.comments}>
                    <div className={Comment_module_css_1.default.commentMain}>
                      <span className={Comment_module_css_1.default.commentText}>
                        <pre>{comment.content}</pre>
                      </span>
                      <div>
                        <image_1.default onClick={() => handleDropDown(comment)} src={ic_dot_png_1.default} className={Comment_module_css_1.default.dotImage} alt='수정삭제 버튼' width={24} height={24}/>
                        {commentId === comment.id && isOpenDropDown && (<DropDown_1.default firstAction={{
                        onClickHandler: () => handleEdit(comment.id),
                        label: '수정하기',
                    }} secondAction={{
                        onClickHandler: handleDelete,
                        label: '삭제하기',
                    }} onClose={() => setIsOpenDropDown(false)}/>)}
                      </div>
                    </div>
                    <UserInfo_1.UserInfo comment={comment}/>
                  </div>
                </>)}
            </div>
          </div>))}
      </div>
    </>);
}
