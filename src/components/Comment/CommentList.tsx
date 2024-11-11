import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import EditComment from './EditComment';
import DropDown from '../../utils/DropDown';
import dotIcon from '@/public/ic_dot.png';
import noComment from '@/public/no_comment.png';
import noAsk from '@/public/no_ask.png';
import { UserInfo } from './UserInfo';
import { useUserAuth } from '../../context/UserContextProvider';
import styles from '@/styles/Comment.module.css';
import toast from 'react-hot-toast';
import React from 'react';

export interface Comment {
  articleId: string | string[] | undefined;
  comments: Comments[];
  onCommentDeleteId: any;
  category: string;
}

interface Comments {
  id: string;
  content: string;
  length: number;
}

export default function CommentList({
  articleId,
  comments,
  onCommentDeleteId,
  category,
}: Comment) {
  const [commentId, setCommentId] = useState('');
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { user } = useUserAuth();

  const handleDropDown = (event: any) => {
    if (user?.id === event.userId) {
      setIsOpenDropDown((prev) => !prev);
      setCommentId(event.id);
    } else {
      setIsOpenDropDown(false);
    }
  };

  function handleDelete() {
    onCommentDeleteId(commentId);
    toast.success('삭제가 완료됐습니다!');
    setIsOpenDropDown(false);
  }

  function handleEdit(event: any) {
    const targetElement = event.target as HTMLElement;
    const editId = targetElement.dataset.id;

    if (editId) {
      setEditId(editId);
    }
  }

  if (comments.length === 0) {
    return (
      <Image
        src={category === 'freeboard' ? noComment : noAsk}
        alt='댓글이 없습니다'
        className={styles.noComment}
        priority
      />
    );
  }

  return (
    <>
      <div className={styles.commentListLayout}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>
              {editId === comment.id ? (
                <EditComment
                  commentId={comment.id}
                  articleId={articleId}
                  content={comment.content}
                  setEditId={setEditId}
                  setIsOpenDropDown={setIsOpenDropDown}
                />
              ) : (
                <>
                  <div className={styles.comments}>
                    <div className={styles.commentMain}>
                      <span className={styles.commentText}>
                        <pre>{comment.content}</pre>
                      </span>
                      <div>
                        <Image
                          onClick={() => handleDropDown(comment)}
                          src={dotIcon}
                          className={styles.dotImage}
                          alt='수정삭제 버튼'
                          width={24}
                          height={24}
                        />
                        {commentId === comment.id && isOpenDropDown && (
                          <DropDown
                            firstAction={{
                              onClickHandler: () => handleEdit(comment.id),
                              label: '수정하기',
                            }}
                            secondAction={{
                              onClickHandler: handleDelete,
                              label: '삭제하기',
                            }}
                            onClose={() => setIsOpenDropDown(false)}
                          />
                        )}
                      </div>
                    </div>
                    <UserInfo comment={comment} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
