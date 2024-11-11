import styles from '@/styles/ArticleDetail.module.css';
import Image from 'next/image';
import line from '@/public/heartLine.png';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import heartFullIcon from '@/public/ic_heart_full.png';
import DateFormat from '../../utils/DateFormat';
import React from 'react';
import { postFavoriteApi, deleteFavoriteApi } from '../../utils/api/favorite';
import { useEffect, useState } from 'react';
import { ArticleDetailValues } from './ArticleDetail';

export function ArticleDetailUserInfo({
  article,
  isLiked,
  user,
}: ArticleDetailValues) {
  const [isFavorite, setIsFavorite] = useState(isLiked);
  const [favoriteCount, setFavoriteCount] = useState(
    Math.min(article?.favoriteCount || 0)
  );
  const [values, setValues] = useState({ articleId: '', userId: '' });

  const handleFavorite = async () => {
    setIsFavorite((prev) => !prev);

    if (!isFavorite) {
      setFavoriteCount((prev) => prev + 1);

      await postFavoriteApi({
        articleId: values.articleId,
      });
    } else {
      setFavoriteCount((prev) => Math.max(prev - 1, 0));
      await deleteFavoriteApi({
        articleId: values.articleId,
        userId: values.userId,
      });
    }
  };

  useEffect(() => {
    if (article && user) {
      if (typeof article.id === 'string') {
        setValues({
          articleId: article.id,
          userId: user.id,
        });
      }
    }
  }, [article, user]);

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
          <div className={styles.articleInfo}>
            <p className={styles.userName}>{article.user?.nickname}</p>
            <span className={styles.date}>
              <div className={styles.profileIcon}>
                <DateFormat createDate={article} />
              </div>
            </span>
          </div>
        </div>

        <div className={styles.heartCount}>
          <Image src={line} alt='선' className={styles.line} />
          <div className={styles.heart}>
            <Image
              src={isFavorite ? heartFullIcon : heartIcon}
              width={26.8}
              height={23.3}
              alt='하트 아이콘'
              className={styles.heartIcon}
              onClick={() => handleFavorite()}
            />
            <span className={styles.heartCount}>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
