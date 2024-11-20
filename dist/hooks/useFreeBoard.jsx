"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBestArticle = useGetBestArticle;
exports.useFreeBoardArticlesList = useFreeBoardArticlesList;
exports.useGetArticle = useGetArticle;
exports.useEditArticle = useEditArticle;
const react_1 = require("react");
const router_1 = require("next/router");
const react_query_1 = require("@tanstack/react-query");
const freeBoardApi_1 = require("../utils/api/freeBoardApi");
function useGetBestArticle() {
    const { isLoading, data } = (0, react_query_1.useQuery)({
        queryKey: ['bestArticle'],
        queryFn: () => (0, freeBoardApi_1.fetchFreeBoardBestApi)(),
        refetchInterval: 300000,
    });
    return { bestArticles: data, isLoading };
}
function useFreeBoardArticlesList({ orderBy, limit, }) {
    const router = (0, router_1.useRouter)();
    const { keyword } = router.query;
    const { data, fetchNextPage, isLoading, isError, error } = (0, react_query_1.useInfiniteQuery)({
        queryKey: ['articles', orderBy, keyword, limit],
        queryFn: ({ pageParam = 1 }) => (0, freeBoardApi_1.fetchFreeBoardApi)({ sort: orderBy, keyword, page: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined; // 단순히 `number`를 반환
        },
        refetchInterval: 300000,
        initialPageParam: null,
    });
    const uniqueArticles = Array.from(new Map(data === null || data === void 0 ? void 0 : data.pages.flatMap((page) => page === null || page === void 0 ? void 0 : page.articles).map((article) => [article.id, article])).values() || []);
    const totalPages = data === null || data === void 0 ? void 0 : data.pages[0].totalPages;
    // 페이지가 끝나면 더 이상 요청하지 않도록 처리
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (totalPages - (data === null || data === void 0 ? void 0 : data.pages.length) <= 0) {
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
function useGetArticle(id) {
    const { isLoading, data } = (0, react_query_1.useQuery)({
        queryKey: ['article', id],
        queryFn: () => (0, freeBoardApi_1.fetchFreeBoardArticleApi)(id),
        enabled: !!id, // id가 있을 때만 fetch
    });
    return { data, isLoading };
}
function useEditArticle(id) {
    const queryClient = (0, react_query_1.useQueryClient)();
    const router = (0, router_1.useRouter)();
    const postFreeBoardArticle = (0, react_query_1.useMutation)({
        mutationFn: ({ title, content, userId, }) => (0, freeBoardApi_1.postFreeBoardArticleApi)({ title, content, userId }),
        onSuccess: (newArticle) => {
            queryClient.setQueryData(['article', newArticle.id], newArticle);
            router.push(`/freeboard/${newArticle.id}`);
        },
        onError: (error) => {
            console.error('Error editing data:', error);
        },
    });
    const editFreeBoardArticle = (0, react_query_1.useMutation)({
        mutationFn: ({ id, title, content, }) => (0, freeBoardApi_1.editArticleApi)({ id, title, content }),
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
    const deleteFreeBoardArticle = (0, react_query_1.useMutation)({
        mutationFn: (id) => (0, freeBoardApi_1.deleteArticleApi)(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', id] });
            queryClient.invalidateQueries({ queryKey: ['bestArticle'] });
        },
        onError: (error) => {
            console.error('Error editing data:', error);
        },
    });
    const postComment = (newArticle) => {
        postFreeBoardArticle.mutate(newArticle);
    };
    const deleteArticle = (id) => {
        deleteFreeBoardArticle.mutate(id);
    };
    return { editFreeBoardArticle, deleteArticle, postComment };
}
