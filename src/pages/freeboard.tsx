import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import ArticleList from '../components/FreeBoard/ArticleList';
import BestArticleList from '../components/FreeBoard/BestArticleList';
import ArticleListHeader from '../components/FreeBoard/ArticleListHeader';
import { fetchFreeBoardApi } from '../utils/api/freeBoardApi';
import styles from '../styles/FreeBoard.module.css';
import {
  useFreeBoardArticlesList,
  useGetBestArticle,
} from '../hooks/useFreeBoard';

interface Article {
  id: string;
  title: string;
  content: string;
}

interface FreeBoardPageProps {
  initialArticles: Article[];
}

export default function FreeBoardPage({ initialArticles }: FreeBoardPageProps) {
  const [orderBy, setOrderBy] = useState<string>('recent');
  const router = useRouter();
  const { keyword } = router.query;

  const { articles, loading, hasMore, fetchNextPage, isError, error } =
    useFreeBoardArticlesList({
      orderBy,
      limit: 5,
    });

  const { bestArticles } = useGetBestArticle();

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, fetchNextPage]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <div className={styles.body}>
        <BestArticleList articles={bestArticles} />
        <ArticleListHeader keyword={keyword} setOrderBy={setOrderBy} />
        <ArticleList articles={articles} />
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
