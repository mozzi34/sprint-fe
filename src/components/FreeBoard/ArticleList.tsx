import Link from 'next/link';
import Image from 'next/image';
import DateFormat from '../../utils/DateFormat';
import styles from '../../styles/ArticleList.module.css';
import { ArticleWithComments } from '../FleaMarket/ProductList';

export default function ArticleList({ articles }: any) {
  if (articles.length === 0) {
    return (
      <div className={styles.articleList}>
        <div className={styles.noArticleList}>둘러볼 게시글이 없습니다</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.articleList}>
        {articles.map((article: ArticleWithComments) => (
          <div
            key={typeof article.id === 'string' ? article.id : ''}
            className={styles.list}
          >
            <Link href={`/freeboard/${article.id}`} className={styles.link}>
              <div className={styles.main}>
                <span className={styles.title}>
                  {article.title}
                  <span className={styles.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <Image src='/article_image.png' alt='기본이미지' />
              </div>

              <div className={styles.userInfo}>
                <div>
                  <Image src='/ic_profile.png' alt='프로필 이미지' />
                  <span className={styles.userName}>{article.user?.name}</span>
                  <span className={styles.date}>
                    <DateFormat createDate={article} />
                  </span>
                </div>
                <div className={styles.favorite}>
                  <Image src='/ic_heart.png' alt='하트 아이콘' />
                  <span className={styles.favoriteCount}>
                    {Math.max(article.favorite, 0)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
