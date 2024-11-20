import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/BestArticleList.module.css';
import DateFormat from '../../utils/DateFormat';
import useBestArticleByDevice from '../../hooks/useBestArticleByDevice';
import heartIcon from '@/public/ic_heart.png';
import { ArticleWithComments } from '../FleaMarket/ProductList';

export default function BestArticleList({ articles }: any) {
  const articlesList = articles?.data;
  const { bestArticles } = useBestArticleByDevice({
    articlesList,
    maxProduct: 3,
  });

  if (bestArticles?.length === 0) {
    return (
      <>
        <div className={styles.mainText}>베스트 게시글</div>
        <div className={styles.articleList}>
          <div className={styles.noArticleList}>둘러볼 게시글이 없습니다</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.mainText}>베스트 게시글</div>
      <div className={styles.articleList}>
        {bestArticles?.map((article: ArticleWithComments) => (
          <div
            key={typeof article.id === 'string' ? article.id : ''}
            className={styles.list}
          >
            <Link href={`/freeboard/${article.id}`} className={styles.link}>
              <Image src='/best_badge.png' alt='베스트 뱃지' />
              <div className={styles.main}>
                <div className={styles.title}>{article.title}</div>
                <Image
                  src='/article_image.png'
                  alt='기본이미지'
                  className={styles.image}
                />
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{article.user?.name}</span>
                  <Image
                    src='/ic_heart.png'
                    alt='하트 아이콘'
                    width={16}
                    height={16}
                    className={styles.heartIcon}
                  />
                  <span className={styles.favoriteCount}>
                    {article.favorite}
                  </span>
                </div>
                <span className={styles.date}>
                  <DateFormat createDate={article} />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
