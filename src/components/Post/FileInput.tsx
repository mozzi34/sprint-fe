import styles from '@/styles/ArticleFormFields.module.css';
import { useRef, useState } from 'react';
import Image from 'next/image';
import postImage from '@/public/post_imge.png';
import icImageDelete from '@/public/ic_image_delete.png';
import { useEffect } from 'react';
import { Article } from '../ArticleDetail/ArticleDetailInfo';

export default function FileInput({ values, setValues }: any) {
  const [showImages, setShowImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageLists = files[0];
    const currentImageUrl = URL.createObjectURL(imageLists);

    let imageUrlLists = [...showImages, currentImageUrl];

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setShowImages(imageUrlLists);
    setValues((prev: any) => ({
      ...prev,
      images: [...prev, imageLists],
    }));
  };

  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));

    setValues((prev: any) => ({
      ...prev,
      images: values.images.filter((_: any, index: number) => index !== id),
    }));
  };

  useEffect(() => {
    if (values.images && values.images.length > 0) {
      const updatedImages = values.images.map((image: any) => {
        if (typeof image === 'string') {
          return `https://sprint-be-ztdn.onrender.com/${image}`;
        }
        return URL.createObjectURL(image);
      });
      setShowImages(updatedImages);
    } else {
      setShowImages([]);
    }
  }, [values.images]);

  return (
    <div className={styles.fileInput}>
      <div className={styles.sectionTitle}>이미지</div>

      <input
        name='images'
        type='file'
        onChange={handleSelectImage}
        ref={imageRef}
        multiple
        accept='image/*'
        style={{ display: 'none' }}
      />

      <div className={styles.imageList}>
        <div
          onClick={() => imageRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={postImage}
            alt='이미지 넣기 버튼'
            width={282}
            height={282}
          />
        </div>
        {showImages.map((image, id) => (
          <div key={id}>
            <Image
              src={image}
              width={282}
              height={282}
              alt={`${image}-${id}`}
              className={styles.imageValue}
            />
            <Image
              src={icImageDelete}
              alt='삭제 버튼'
              width={22}
              height={24}
              onClick={() => handleDeleteImage(id)}
              className={styles.imageDeleBtn}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
