import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import dotIcon from '../../../public/ic_dot.png';
import DropDown from '../../utils/DropDown';
import { useEditArticle } from '../../hooks/useFreeBoard';
import { ArticleDeleteModal } from '../../utils/Modal';
import { UserInfo } from './UserInfo';
import styles from '../../styles/Article.module.css';

export interface Article {
  id: string | string[] | undefined;
  title: string;
  content: string;
  images: string[];
  favorite: number;
  price?: string;
  user?: User;
  userId?: string | null;
  tags?: string[];
}

export interface User {
  id: string | null;
  name: string;
  nickname: string;
}

export interface ArticleProps {
  article: Article;
  category?: string;
  isLiked?: boolean;
}

export default function ArticleDetailInfo({ article, category }: ArticleProps) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { deleteArticle } = useEditArticle(id);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    if (typeof id === 'string') {
      deleteArticle(id); // id가 string일 경우만 호출
      toast.success('삭제가 완료됐습니다!');
      router.push(`/${category}`);
    } else {
      // id가 string이 아닌 경우 (예: string[] 또는 undefined) 처리
      toast.error('잘못된 ID입니다.');
    }
  };

  const handleDropDown = useCallback(() => {
    setIsOpenDropDown((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    router.push(`/${category}/edit/${id}`);
  }, [id, router, category]);

  if (!article) {
    return <div>loading...</div>;
  }

  return (
    <>
      {isModalOpen && (
        <ArticleDeleteModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => onConfirm()}
        />
      )}

      <div className={styles.title}>
        <div className={styles.titleText}>{article.title}</div>
        <div className={styles.buttonTest}>
          <Image
            src={dotIcon}
            alt='수정삭제 버튼'
            onClick={handleDropDown}
            className={styles.dotImage}
          />
          {isOpenDropDown && (
            <DropDown
              firstAction={{
                onClickHandler: handleEdit,
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
      <UserInfo article={article} />

      <div className={styles.content}>{article.content}</div>
      <div>{article.images}</div>
      {/* <Image src={article.image} width={150} height={150} alt='이미지' /> */}
    </>
  );
}
