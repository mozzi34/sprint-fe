"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchForm;
const router_1 = require("next/router");
const react_1 = require("react");
const Fleamarket_module_css_1 = __importDefault(require("../../styles/Fleamarket.module.css"));
const image_1 = __importDefault(require("next/image"));
function SearchForm({ keyword }) {
    const router = (0, router_1.useRouter)();
    const [value, setValue] = (0, react_1.useState)(keyword || '');
    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!value) {
            router.push('/fleamarket');
            return;
        }
        router.push(`/fleamarket?keyword=${value}`);
    }
    (0, react_1.useEffect)(() => {
        setValue(keyword || '');
    }, [keyword]);
    return (<>
      <form onSubmit={handleSubmit} className={Fleamarket_module_css_1.default.submit}>
        <image_1.default src='/ic_search.png' alt='검색 아이콘' className={Fleamarket_module_css_1.default.icon} width={10} height={10}/>
        <input name='keyword' value={value} onChange={handleChange} placeholder='검색어를 입력해 주세요' className={Fleamarket_module_css_1.default.searchInput}/>
      </form>
    </>);
}
