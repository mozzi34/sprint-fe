"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComments = useComments;
exports.useEditComment = useEditComment;
const react_query_1 = require("@tanstack/react-query");
const commentApi_1 = require("../utils/api/commentApi");
function useComments({ articleId, category }) {
    var _a, _b;
    const { data, fetchNextPage, isLoading } = (0, react_query_1.useInfiniteQuery)({
        queryKey: ['comments', articleId],
        queryFn: ({ pageParam = null }) => (0, commentApi_1.fetchCommentsApi)({ articleId, category, cursorId: pageParam }),
        getNextPageParam: (lastPage) => {
            const comments = (lastPage === null || lastPage === void 0 ? void 0 : lastPage.comments) || [];
            return comments.length > 0 ? comments[comments.length - 1].id : undefined;
        },
        enabled: !!articleId && !!category,
        initialPageParam: null,
    });
    const uniqueComments = Array.from(new Map(data === null || data === void 0 ? void 0 : data.pages.flatMap((page) => (page === null || page === void 0 ? void 0 : page.comments) || []).map((comment) => [comment.id, comment])).values() || []);
    const totalCount = (_b = (_a = data === null || data === void 0 ? void 0 : data.pages[0]) === null || _a === void 0 ? void 0 : _a.totalCount) !== null && _b !== void 0 ? _b : 0;
    return {
        uniqueComments,
        fetchNextPage,
        isLoading,
        totalCount,
    };
}
function useEditComment({ articleId }) {
    const queryClient = (0, react_query_1.useQueryClient)();
    const deleteCommentMutation = (0, react_query_1.useMutation)({
        mutationFn: (targetId) => (0, commentApi_1.deleteCommentApi)(targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
        },
    });
    const deleteComments = (targetId) => {
        deleteCommentMutation.mutate(targetId);
    };
    const postCommentMutation = (0, react_query_1.useMutation)({
        mutationFn: ({ category, articleId, comment, userId }) => (0, commentApi_1.postCommentApi)({ category, articleId, comment, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
        },
    });
    const editCommentMutation = (0, react_query_1.useMutation)({
        mutationFn: ({ id, editComment }) => (0, commentApi_1.editCommentApi)({ id, editComment }),
        onSuccess: (newComment) => {
            queryClient.setQueryData(['comments', articleId], (previous) => {
                if (!previous)
                    return [];
                return Object.assign(Object.assign({}, previous), { pages: previous.pages.map((page) => (Object.assign(Object.assign({}, page), { comments: page.comments.map((comment) => comment.id === newComment.id ? newComment : comment) }))) });
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
