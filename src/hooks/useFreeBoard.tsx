import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchFreeBoardApi,
  fetchFreeBoardBestApi,
  fetchFreeBoardArticleApi,
  postFreeBoardArticleApi,
  editArticleApi,
  deleteArticleApi,
} from '../utils/api/freeBoardApi';

interface Article {
  id: string;
  title: string;
  content: string;
}

interface LastPageValues {
  totalPages: number;
  articles: Article[];
  pages: any;
}

export function useGetBestArticle() {
  const { isLoading, data } = useQuery({
    queryKey: ['bestArticle'],
    queryFn: () => fetchFreeBoardBestApi(),
    refetchInterval: 300000,
  });

  return { bestArticles: data, isLoading };
}

export function useFreeBoardArticlesList({
  orderBy,
  limit,
}: {
  orderBy: string;
  limit: number;
}) {
  const router = useRouter();
  const { keyword } = router.query;

  const { data, fetchNextPage, isLoading, isError, error } = useInfiniteQuery<
    LastPageValues,
    Error,
    LastPageValues,
    [string, string, string | string[] | undefined, number]
  >({
    queryKey: ['articles', orderBy, keyword, limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchFreeBoardApi({ sort: orderBy, keyword, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined; // 단순히 `number`를 반환
    },
    refetchInterval: 300000,
    initialPageParam: null,
  });

  const uniqueArticles = Array.from(
    new Map(
      data?.pages
        .flatMap((page: any) => page?.articles)
        .map((article: any) => [article.id, article])
    ).values() || []
  );

  const totalPages = data?.pages[0].totalPages;

  // 페이지가 끝나면 더 이상 요청하지 않도록 처리
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (totalPages - data?.pages.length <= 0) {
      setHasMore(false);
    }
  }, [data, totalPages]);

  return {
    articles: uniqueArticles,
    loading: isLoading,
    hasMore,
    isError,
    error,
    fetchNextPage,
  };
}

export function useGetArticle(id: string) {
  const { isLoading, data } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchFreeBoardArticleApi(id),
    enabled: !!id, // id가 있을 때만 fetch
  });

  return { data, isLoading };
}

export function useEditArticle(id: string | string[] | undefined) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postFreeBoardArticle = useMutation({
    mutationFn: ({
      title,
      content,
      userId,
    }: {
      title: string;
      content: string;
      userId: string;
    }) => postFreeBoardArticleApi({ title, content, userId }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      router.push(`/freeboard/${newArticle.id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const editFreeBoardArticle = useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: string;
      title: string;
      content: string;
    }) => editArticleApi({ id, title, content }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      queryClient.invalidateQueries({ queryKey: ['article', newArticle.id] });
      queryClient.invalidateQueries({ queryKey: ['bestArticle'] });
      router.push(`/freeboard/${id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFreeBoardArticle = useMutation({
    mutationFn: (id: string) => deleteArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      queryClient.invalidateQueries({ queryKey: ['bestArticle'] });
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const postComment = (newArticle: any) => {
    postFreeBoardArticle.mutate(newArticle);
  };

  const deleteArticle = (id: string) => {
    deleteFreeBoardArticle.mutate(id);
  };

  return { editFreeBoardArticle, deleteArticle, postComment };
}
