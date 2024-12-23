"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useScroll;
const react_1 = require("react");
const lodash_1 = require("lodash");
function useScroll({ comment, isLoading, hasMore }) {
    const [isScroll, setIsScroll] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const handleScroll = (0, lodash_1.throttle)(() => {
            if (isLoading || !hasMore)
                return;
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight - 100 && !isScroll) {
                setIsScroll(true);
            }
            else {
                setIsScroll(false);
            }
        }, 200);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, hasMore, isScroll, comment]);
    return { canScroll: isScroll };
}
