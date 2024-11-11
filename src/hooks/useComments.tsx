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

interface Comment {
  id: string;
  content: string;
  userId: string;
}

export interface Page {
  comments: Comment[];
  totalCount: number;
}

export function useComments({ articleId, category }: UseCommentValues) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Page>({
    queryKey: ['comments', articleId], // 캐시 키로 사용
    queryFn: ({ pageParam = null }) =>
      fetchCommentsApi({ articleId, category, cursorId: pageParam }), // API 호출
    getNextPageParam: (lastPage: Page) => {
      const comments = lastPage?.comments || [];
      return comments.length > 0 ? comments[comments.length - 1].id : undefined;
    },
    enabled: !!articleId && !!category, // articleId와 category가 있을 때만 활성화
  });

  // 중복 댓글을 제거한 유니크한 댓글 리스트 생성
  const uniqueComments = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page?.comments || [])
        .map((comment) => [comment.id, comment]) // 댓글 id를 키로 사용하는 Map
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
    mutationFn: ({
      id,
      editComment,
      articleId,
    }: {
      id: string;
      editComment: string;
      articleId: string | string[] | undefined;
    }) => editCommentApi({ id, editComment }),
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
