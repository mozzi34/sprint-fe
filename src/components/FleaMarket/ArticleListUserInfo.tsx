import Image from 'next/image';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import DateFormat from '../../utils/DateFormat';
import styles from '../../styles/Fleamarket.module.css';
import { Article } from '../ArticleDetail/ArticleDetailInfo';

interface ArticleUserValues {
  article: ArticleUserWithLikeValues;
}

interface ArticleUserWithLikeValues extends Article {
  favoriteCount: number;
}

export function ArticleListUserInfo({ article }: ArticleUserValues) {
  return (
    <>
      <div className={styles.userInfo}>
        {/* <div> */}
        {/* <Image src={profileIcon} alt='프로필 이미지' width={32} height={32} /> */}
        {/* <span className={styles.userName}>{article.user.name}</span> */}
        {/* <span className={styles.date}>
            <DateFormat createDate={article} />
          </span> */}
        {/* </div> */}
        <div className={styles.favorite}>
          <Image src='/ic_heart.png' alt='하트 아이콘' width={16} height={16} />
          <span className={styles.favoriteCount}>
            {Math.max(article.favoriteCount, 0)}
          </span>
        </div>
      </div>
    </>
  );
}
