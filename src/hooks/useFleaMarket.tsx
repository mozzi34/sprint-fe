import { useRouter } from 'next/router';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchFleaMarketApi,
  fetchFleaMarketBestApi,
  fetchFleaMarketDetailApi,
  postFleaMarketArticleApi,
  editFleaMarketArticleApi,
  deleteFleaMarketArticleApi,
} from '../utils/api/fleaMarketApi';

import { Article } from '../pages/fleamarket/edit/[id]';

export function useGetBestArticle() {
  const { isLoading, data } = useQuery({
    queryKey: ['bestArticle'],
    queryFn: () => fetchFleaMarketBestApi(),
  });

  return { bestArticles: data, isLoading };
}

export function useGetArticleList({
  page,
  sort,
  keyword,
}: {
  page: number | undefined;
  sort: string | undefined;
  keyword: string | string[] | undefined;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['article', page, sort, keyword],
    queryFn: () => fetchFleaMarketApi({ page, sort, keyword }),
  });

  const totalPages = data?.totalPages;
  const articles = data?.data;

  return {
    articles,
    totalPages,
    isLoading,
    isError,
    error,
  };
}

export function useGetArticleDetail({
  id,
  userId,
}: {
  id: string;
  userId: string | null;
}) {
  const { isLoading, data } = useQuery({
    queryKey: ['article', id, userId],
    queryFn: () => fetchFleaMarketDetailApi({ id, userId }),
    enabled: !!id && !!userId,
  });

  return { data, isLoading };
}

export function useFleaMarketEditArticle({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const editFleaMarketArticle = useMutation({
    mutationFn: (article: Article) =>
      editFleaMarketArticleApi({ id, title, content, tags, images, price }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', id], newArticle);
      queryClient.invalidateQueries(['article', id]);
      router.push(`/fleamarket/${id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMarketArticle = useMutation({
    mutationFn: (id) => deleteFleaMarketArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['bestArticle']);
    },

    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMArketArticle = (id: string) => {
    deleteFleaMarketArticle.mutate(id);
  };

  return { editFleaMarketArticle, deleteFleaMArketArticle };
}

export function useFleaMarketPostArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postFleaMarketArticle = useMutation({
    mutationFn: ({ title, content, price, images, tags, userId }) =>
      postFleaMarketArticleApi({ title, content, price, images, tags, userId }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle.id], newArticle);
      router.push(`/fleamarket/${newArticle.data.id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const postArticle = (newArticle) => {
    postFleaMarketArticle.mutate(newArticle);
  };

  return { postArticle };
}
