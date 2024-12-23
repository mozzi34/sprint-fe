"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileInput;
const ArticleFormFields_module_css_1 = __importDefault(require("@/styles/ArticleFormFields.module.css"));
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const post_imge_png_1 = __importDefault(require("@/public/post_imge.png"));
const ic_image_delete_png_1 = __importDefault(require("@/public/ic_image_delete.png"));
const react_2 = require("react");
function FileInput({ values, setValues }) {
    const [showImages, setShowImages] = (0, react_1.useState)([]);
    const imageRef = (0, react_1.useRef)(null);
    const handleSelectImage = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0)
            return;
        const imageLists = files[0];
        const currentImageUrl = URL.createObjectURL(imageLists);
        let imageUrlLists = [...showImages, currentImageUrl];
        if (imageUrlLists.length > 3) {
            imageUrlLists = imageUrlLists.slice(0, 3);
        }
        setShowImages(imageUrlLists);
        setValues((prev) => (Object.assign(Object.assign({}, prev), { images: [...prev, imageLists] })));
    };
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        setValues((prev) => (Object.assign(Object.assign({}, prev), { images: values.images.filter((_, index) => index !== id) })));
    };
    (0, react_2.useEffect)(() => {
        if (values.images && values.images.length > 0) {
            const updatedImages = values.images.map((image) => {
                if (typeof image === 'string') {
                    return `https://sprint-be-ztdn.onrender.com/${image}`;
                }
                return URL.createObjectURL(image);
            });
            setShowImages(updatedImages);
        }
        else {
            setShowImages([]);
        }
    }, [values.images]);
    return (<div className={ArticleFormFields_module_css_1.default.fileInput}>
      <div className={ArticleFormFields_module_css_1.default.sectionTitle}>이미지</div>

      <input name='images' type='file' onChange={handleSelectImage} ref={imageRef} multiple accept='image/*' style={{ display: 'none' }}/>

      <div className={ArticleFormFields_module_css_1.default.imageList}>
        <div onClick={() => { var _a; return (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} style={{ cursor: 'pointer' }}>
          <image_1.default src={post_imge_png_1.default} alt='이미지 넣기 버튼' width={282} height={282}/>
        </div>
        {showImages.map((image, id) => (<div key={id}>
            <image_1.default src={image} width={282} height={282} alt={`${image}-${id}`} className={ArticleFormFields_module_css_1.default.imageValue}/>
            <image_1.default src={ic_image_delete_png_1.default} alt='삭제 버튼' width={22} height={24} onClick={() => handleDeleteImage(id)} className={ArticleFormFields_module_css_1.default.imageDeleBtn}/>
          </div>))}
      </div>
    </div>);
}
