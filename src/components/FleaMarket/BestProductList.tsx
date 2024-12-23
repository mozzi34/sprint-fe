import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/BestProductList.module.css';
import useBestProductByDevice from '../../hooks/useBestArticleByDevice';
import { ArticleDetailWithLike } from './ArticleDetail';

interface Articles {
  data: ArticleDetailWithLike[];
}

interface ArticlesValues {
  articles: Articles[];
}

export default function BestProductList({ articles }: ArticlesValues) {
  const articlesList = articles?.map((item) => item.data).flat() || [];
  const { bestArticles } = useBestProductByDevice({
    articlesList,
    maxProduct: 4,
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
      <div className={styles.mainText}>베스트 상품</div>
      <div className={styles.articleList}>
        {bestArticles?.map((article: ArticleDetailWithLike) => (
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
                className={styles.productImage}
                width={282}
                height={282}
              />
              <div className={styles.productInfo}>
                <div className={styles.title}>{article.title}</div>
                <div className={styles.price}>
                  {article?.price
                    ? article.price
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : '가격 정보 없음'}
                  원
                </div>
                <div className={styles.favorite}>
                  <Image
                    src='/ic_heart.png'
                    alt='하트 아이콘'
                    width={16}
                    height={16}
                    className={styles.heartIcon}
                  />
                  <div className={styles.favoriteCount}>
                    {article.favoriteCount}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
