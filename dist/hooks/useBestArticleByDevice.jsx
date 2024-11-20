"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBestArticleByDevice;
const react_1 = require("react");
function useBestArticleByDevice({ articlesList, maxProduct, }) {
    const [bestArticles, setBestArticles] = (0, react_1.useState)(articlesList);
    const [resize, setResize] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setResize(screenWidth);
            let maxArticles;
            if (screenWidth <= 743) {
                maxArticles = 1;
            }
            else if (screenWidth <= 1199) {
                maxArticles = 2;
            }
            else {
                maxArticles = maxProduct || 3;
            }
            if (articlesList) {
                setBestArticles(articlesList.slice(0, maxArticles));
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [articlesList]);
    return { bestArticles };
}
