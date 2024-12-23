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

import { ArticleWithUser, Tag } from '../pages/fleamarket/edit/[id]';
import { FetchFleaMarketApiContent } from '../utils/api/fleaMarketApi';

export interface ArticleHooksValues {
  id?: string;
  title: string | undefined;
  content: string | undefined;
  images: string[] | undefined;
  price: string | undefined;
  userId: string | undefined;
  tags: string[];
}

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
    mutationFn: (article: ArticleWithUser) => {
      return editFleaMarketArticleApi({
        id,
        title: article.title,
        content: article.content,
        tags: article.tags?.map((tag) => tag) || [],
        images: article.images || [],
        price: article.price,
        userId: article.userId as string,
      });
    },
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', id], newArticle);

      queryClient.invalidateQueries({
        queryKey: ['article', id],
        exact: true,
      });

      router.push(`/fleamarket/${id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMarketArticle = useMutation({
    mutationFn: (id: string) => deleteFleaMarketArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bestArticle'],
        exact: true,
      });
    },

    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const deleteFleaMArketArticle = (id: any) => {
    deleteFleaMarketArticle.mutate(id);
  };

  return { editFleaMarketArticle, deleteFleaMArketArticle };
}

export function useFleaMarketPostArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postFleaMarketArticle = useMutation({
    mutationFn: ({
      title,
      content,
      price,
      images,
      tags,
      userId,
    }: {
      title: string;
      content: string;
      price: string;
      images: string[];
      tags: string[];
      userId: string;
    }) =>
      postFleaMarketArticleApi({ title, content, price, images, tags, userId }),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', newArticle?.data?.id], newArticle);
      router.push(`/fleamarket/${newArticle?.data.id}`);
    },
    onError: (error) => {
      console.error('Error editing data:', error);
    },
  });

  const postArticle = (newArticle: any) => {
    postFleaMarketArticle.mutate(newArticle);
  };

  return { postArticle };
}
