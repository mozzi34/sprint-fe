import { CommentButton, CommentCancelButton } from '../../utils/Button';
import styles from '../../styles/Comment.module.css';
import { useEditComment } from '../../hooks/useComments';
import { useState } from 'react';

interface EditCommentValues {
  articleId: string | string[] | undefined;
  commentId: string;
  content: string;
  setEditId: (id: string | null) => void;
  setIsOpenDropDown: (isOpen: boolean) => void;
}

export default function EditComment({
  commentId,
  articleId,
  content,
  setEditId,
  setIsOpenDropDown,
}: EditCommentValues) {
  const [editComment, setEditComment] = useState(content);
  const handleCommentChange = (event: any) => {
    setEditComment(event.target.value);
  };

  const { editCommentMutation } = useEditComment({ articleId });

  const handleSubmit = () => {
    editCommentMutation.mutate({ id: commentId, editComment });
    setEditId(null);
    setIsOpenDropDown(false);
  };

  const handleCancelSubmit = () => {
    setEditId(null);
    setIsOpenDropDown(false);
  };

  return (
    <>
      <div className={styles.editSubmit}>
        <div className={styles.comment}>댓글 수정하기</div>
        <textarea
          value={editComment}
          onChange={handleCommentChange}
          placeholder='댓글을 입력해 주세요.'
          className={styles.inputComment}
        />

        <CommentCancelButton
          disabled={!content}
          onClick={handleCancelSubmit}
          label='취소'
        />

        <CommentButton
          disabled={!editComment}
          onClick={handleSubmit}
          label='수정'
        />
      </div>
    </>
  );
}
