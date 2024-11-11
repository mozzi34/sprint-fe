import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import line from '../../../public/heartLine.png';
import profileIcon from '../../../public/ic_profile.png';
import heartIcon from '../../../public/ic_heart.png';
import heartFullIcon from '../../../public/ic_heart_full.png';
import DateFormat from '../../utils/DateFormat';
import { postFavoriteApi, deleteFavoriteApi } from '../../utils/api/favorite';
import styles from '../../styles/Article.module.css';
import { ArticleProps } from './ArticleDetailInfo';

export function UserInfo({ article }: ArticleProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(
    Math.max(article?.favorite, 0)
  );
  const articleId = article?.id || '';

  const handleFavorite = async (articleId: any) => {
    setIsFavorite((prev) => !prev);
    if (!isFavorite) {
      setFavoriteCount((prev) => Math.max(prev + 1, 0));
      await postFavoriteApi(articleId);
    } else {
      setFavoriteCount((prev) => Math.max(prev - 1, 0));
      await deleteFavoriteApi(articleId);
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
        <p className={styles.userName}>{article.user?.name}</p>
        <span className={styles.date}>
          <div className={styles.profileIcon}>
            <DateFormat createDate={article} />
          </div>
        </span>
        <Image src={line} alt='선' className={styles.line} />
        <div className={styles.heart}>
          <Image
            src={isFavorite ? heartFullIcon : heartIcon}
            alt='하트 아이콘'
            width={26.8}
            height={23.3}
            onClick={() => handleFavorite(articleId)}
          />
          <span className={styles.heartCount}>{favoriteCount}</span>
        </div>
      </div>
    </>
  );
}
