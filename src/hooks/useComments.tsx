import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchCommentsApi,
  postCommentApi,
  deleteCommentApi,
  editCommentApi,
} from '../utils/api/commentApi';
import { PostCommentValue } from '../utils/api/commentApi';

interface UseCommentValues {
  articleId: string | string[] | undefined;
  category: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  length?: number;
}

export interface Page {
  comments: Comment[];
  totalCount: number;
}

export function useComments({ articleId, category }: UseCommentValues) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Page>({
    queryKey: ['comments', articleId],
    queryFn: ({ pageParam = null }) =>
      fetchCommentsApi({ articleId, category, cursorId: pageParam }),
    getNextPageParam: (lastPage: Page) => {
      const comments = lastPage?.comments || [];
      return comments.length > 0 ? comments[comments.length - 1].id : undefined;
    },
    enabled: !!articleId && !!category,
    initialPageParam: null,
  });

  const uniqueComments = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page?.comments || [])
        .map((comment) => [comment.id, comment])
    ).values() || []
  );

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return {
    uniqueComments,
    fetchNextPage,
    isLoading,
    totalCount,
  };
}

export function useEditComment({ articleId }: any) {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: (targetId: string) => deleteCommentApi(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });

  const deleteComments = (targetId: string) => {
    deleteCommentMutation.mutate(targetId);
  };

  const postCommentMutation = useMutation({
    mutationFn: ({ category, articleId, comment, userId }: PostCommentValue) =>
      postCommentApi({ category, articleId, comment, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ id, editComment }: { id: string; editComment: string }) =>
      editCommentApi({ id, editComment }),
    onSuccess: (newComment) => {
      queryClient.setQueryData(['comments', articleId], (previous: any) => {
        if (!previous) return [];

        return {
          ...previous,
          pages: previous.pages.map((page: any) => ({
            ...page,
            comments: page.comments.map((comment: any) =>
              comment.id === newComment.id ? newComment : comment
            ),
          })),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ['comments', articleId],
      });
    },
  });

  return {
    postCommentMutation,
    editCommentMutation,
    deleteComments,
  };
}
