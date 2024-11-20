"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBestArticle = useGetBestArticle;
exports.useGetArticleList = useGetArticleList;
exports.useGetArticleDetail = useGetArticleDetail;
exports.useFleaMarketEditArticle = useFleaMarketEditArticle;
exports.useFleaMarketPostArticle = useFleaMarketPostArticle;
const router_1 = require("next/router");
const react_query_1 = require("@tanstack/react-query");
const fleaMarketApi_1 = require("../utils/api/fleaMarketApi");
function useGetBestArticle() {
    const { isLoading, data } = (0, react_query_1.useQuery)({
        queryKey: ['bestArticle'],
        queryFn: () => (0, fleaMarketApi_1.fetchFleaMarketBestApi)(),
    });
    return { bestArticles: data, isLoading };
}
function useGetArticleList({ page, sort, keyword, }) {
    const { data, isLoading, isError, error } = (0, react_query_1.useQuery)({
        queryKey: ['article', page, sort, keyword],
        queryFn: () => (0, fleaMarketApi_1.fetchFleaMarketApi)({ page, sort, keyword }),
    });
    const totalPages = data === null || data === void 0 ? void 0 : data.totalPages;
    const articles = data === null || data === void 0 ? void 0 : data.data;
    return {
        articles,
        totalPages,
        isLoading,
        isError,
        error,
    };
}
function useGetArticleDetail({ id, userId, }) {
    const { isLoading, data } = (0, react_query_1.useQuery)({
        queryKey: ['article', id, userId],
        queryFn: () => (0, fleaMarketApi_1.fetchFleaMarketDetailApi)({ id, userId }),
        enabled: !!id && !!userId,
    });
    return { data, isLoading };
}
function useFleaMarketEditArticle({ id, }) {
    const queryClient = (0, react_query_1.useQueryClient)();
    const router = (0, router_1.useRouter)();
    const editFleaMarketArticle = (0, react_query_1.useMutation)({
        mutationFn: (article) => {
            var _a;
            return (0, fleaMarketApi_1.editFleaMarketArticleApi)({
                id,
                title: article.title,
                content: article.content,
                tags: ((_a = article.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag)) || [],
                images: article.images || [],
                price: article.price,
                userId: article.userId,
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
    const deleteFleaMarketArticle = (0, react_query_1.useMutation)({
        mutationFn: (id) => (0, fleaMarketApi_1.deleteFleaMarketArticleApi)(id),
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
    const deleteFleaMArketArticle = (id) => {
        deleteFleaMarketArticle.mutate(id);
    };
    return { editFleaMarketArticle, deleteFleaMArketArticle };
}
function useFleaMarketPostArticle() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const router = (0, router_1.useRouter)();
    const postFleaMarketArticle = (0, react_query_1.useMutation)({
        mutationFn: ({ title, content, price, images, tags, userId, }) => (0, fleaMarketApi_1.postFleaMarketArticleApi)({ title, content, price, images, tags, userId }),
        onSuccess: (newArticle) => {
            var _a;
            queryClient.setQueryData(['article', (_a = newArticle === null || newArticle === void 0 ? void 0 : newArticle.data) === null || _a === void 0 ? void 0 : _a.id], newArticle);
            router.push(`/fleamarket/${newArticle === null || newArticle === void 0 ? void 0 : newArticle.data.id}`);
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
