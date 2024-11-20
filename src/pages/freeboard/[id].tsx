import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import backBtn from '../../../public/btn_back.png';
import Comments from '../../components/Comment/Comments';
import ArticleDetailInfo from '../../components/ArticleDetail/ArticleDetailInfo';
import styles from '../../styles/Article.module.css';
import { useGetArticle } from '../../hooks/useFreeBoard';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const category: string = 'freeboard';

  const { isLoading, data: article } =
    typeof id === 'string'
      ? useGetArticle(id)
      : { isLoading: true, data: null };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // toast.error('로그인을 해야 합니다.');
        router.push('/login'); //비동기
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.article}>
        <ArticleDetailInfo article={article} category={category} />
        <Comments category={category} />

        <Link href={'/freeboard'}>
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
