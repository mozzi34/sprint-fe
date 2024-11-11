import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Fleamarket.module.css';
import { ArticleListUserInfo } from './ArticleListUserInfo';
import { Article } from '../ArticleDetail/ArticleDetailInfo';

interface ArticlesValues {
  articles: ArticleWithComments[];
}

export interface ArticleWithComments extends Article {
  comment: string;
  favoriteCount: number;
}

export default function ProductList({ articles }: ArticlesValues) {
  if (articles?.length === 0) {
    return (
      <div className={styles.articleList}>
        <div className={styles.noArticleList}>둘러볼 상품이 없습니다</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.articleList}>
        {articles?.map((article) => (
          <div
            key={typeof article.id === 'string' ? article.id : ''}
            className={styles.list}
          >
            <Link href={`/fleamarket/${article.id}`} className={styles.link}>
              <Image
                src={
                  article.images && article.images.length > 0
                    ? `https://sprint-be-ztdn.onrender.com/${article.images[0]}`
                    : '/article_image.png'
                }
                alt='기본이미지'
                width={221}
                height={221}
              />

              <div className={styles.productInfo}>
                <span className={styles.title}>
                  {article.title}
                  <span className={styles.commentCount}>
                    [{article.comment.length}]
                  </span>
                </span>
                <div className={styles.price}>
                  {article?.price
                    ? article.price
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : '가격 정보 없음'}
                  원
                </div>
                <ArticleListUserInfo article={article} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
