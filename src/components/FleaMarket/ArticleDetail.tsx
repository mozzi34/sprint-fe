import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/ArticleDetail.module.css';
import dotIcon from '@/public/ic_dot.png';
import DropDown from '../../utils/DropDown';
import TestImage from '@/public/testImage.png';
import { useFleaMarketEditArticle } from '../../hooks/useFleaMarket';
import { ArticleDetailUserInfo } from './ArticleDetailUserInfo';
import { ArticleDeleteModal } from '../../utils/Modal';
import toast from 'react-hot-toast';
import { useUserAuth } from '../../context/UserContextProvider';
import { Article } from '../ArticleDetail/ArticleDetailInfo';
import { ArticleWithUser } from '../../pages/fleamarket/edit/[id]';
import { UserInfo } from '../ArticleDetail/UserInfo';
import { User } from '../ArticleDetail/ArticleDetailInfo';
export interface ArticleDetailValues {
  article: ArticleDetailWithLike;
  isLiked: boolean;
  user?: any;
  category?: string;
}

export interface ArticleDetailWithLike extends ArticleWithUser {
  favoriteCount: number;
  user: User;
}

export default function ArticleDetailInfo({
  isLiked,
  article,
  category,
}: ArticleDetailValues) {
  const [isOenDropDown, setIsOpenDropDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user, isPending } = useUserAuth();
  const { deleteFleaMArketArticle } = useFleaMarketEditArticle({ id });

  let formattedPrice = article?.price
    ? article.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    : '가격 정보 없음';

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    if (typeof id === 'string') {
      deleteFleaMArketArticle(id);
      toast.success('삭제가 완료됐습니다!');
      router.push(`/${category}`);
    }
  };

  const handleDropDown = useCallback(() => {
    if (article.userId === user?.id) {
      setIsOpenDropDown((prev) => !prev);
    } else {
      setIsOpenDropDown(false);
    }
  }, []);

  const handleEdit = useCallback(() => {
    if (category === 'freeboard') {
      router.push(`/freeboard/edit/${id}`);
    } else {
      router.push(`/fleamarket/edit/${id}`);
    }
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
      <div className={styles.layout}>
        <Image
          src={
            article.images && article.images.length > 0
              ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
              : TestImage
          }
          width={486}
          height={486}
          alt='이미지'
          className={styles.itemImage}
        />

        <div className={styles.information}>
          <div className={styles.titleOption}>
            <div className={styles.titleText}>{article.title}</div>
            <div className={styles.buttonTest}>
              <Image
                src={dotIcon}
                alt='수정삭제 버튼'
                onClick={handleDropDown}
                className={styles.dotImage}
                width={24}
                height={24}
              />
              {isOenDropDown && (
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
          <div className={styles.itemPrice}>{formattedPrice}원</div>
        </div>

        <div className={styles.itemInformation}>
          <div className={styles.itemTitleText}>상품 소개</div>
          <div className={styles.itemContent}>
            <pre>{article.content} </pre>
          </div>

          <div className={styles.itemTitleText}>상품 태그</div>
          {article.tags?.map((tag, index) => (
            <li key={tag} className={styles.hashtags}>
              <span className={styles.hashtagTitle}># {tag}</span>
            </li>
          ))}
        </div>

        <ArticleDetailUserInfo
          article={article}
          isLiked={isLiked}
          user={user}
        />
      </div>
    </>
  );
}
