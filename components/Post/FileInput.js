import styles from '@/styles/ArticleFormFields.module.css';
import { useRef, useState } from 'react';
import Image from 'next/image';
import postImage from '@/public/post_imge.png';
import icImageDelete from '@/public/ic_image_delete.png';

export default function FileInput({ values, setValues }) {
  const [showImages, setShowImages] = useState([]);
  const imageRef = useRef();

  const testSelect = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setShowImages(imageUrlLists);
    setValues((prev) => ({
      ...prev,
      image: [...prev.image, imageLists],
    }));
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));

    setValues((prev) => ({
      ...prev,
      image: values.image.filter((_, index) => index !== id),
    }));
  };

  return (
    <div className={styles.fileInput}>
      <div className={styles.sectionTitle}>이미지</div>

      <input
        name='image'
        type='file'
        onChange={testSelect}
        ref={imageRef}
        multiple
        accept='image/*'
        style={{ display: 'none' }}
      />

      <div className={styles.imageList}>
        <div
          onClick={() => imageRef.current.click()}
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
            <img
              src={image}
              width={282}
              height={282}
              alt={`${image}-${id}`}
              className={styles.imageValue}
            />
            <Image
              src={icImageDelete}
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
