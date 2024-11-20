import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backBtn from '@/public/btn_back.png';
import Comments from '../../components/Comment/Comments';
import ArticleDetail from '../../components/FleaMarket/ArticleDetail';
import styles from '@/styles/Article.module.css';
import { useGetArticleDetail } from '../../hooks/useFleaMarket';
import { useUserAuth } from '../../context/UserContextProvider';
import { Article } from '../../components/ArticleDetail/ArticleDetailInfo';

export interface ArticleDetailValues {
  article: ArticleDetailWithLike;
  isLiked: boolean;
  user: any;
  category?: string;
}

export interface ArticleDetailWithLike extends Article {
  favoriteCount: number;
}

export default function ArticlePage() {
  const router = useRouter();
  const id = router.query.id;
  const { user } = useUserAuth();

  const category: string = 'fleamarket';

  const { isLoading, data } = useGetArticleDetail({
    id: id as string,
    userId: user?.id as string | null,
  });

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.article}>
        <ArticleDetail
          article={data?.article}
          isLiked={data?.isLiked}
          category={category}
        />
        <Comments category={category} />

        <Link href={'/fleamarket'}>
          <Image
            src={backBtn}
            alt='목록으로 돌아가기 버튼'
            className={styles.backBtn}
            priority
          />
        </Link>
      </div>
    </>
  );
}
