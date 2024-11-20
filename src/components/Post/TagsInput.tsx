import styles from '@/styles/ArticleFormFields.module.css';
import Image from 'next/image.js';
import tagRemoveIcon from '@/public/ic_tag_delete.png';
import { Dispatch, SetStateAction } from 'react';

interface TagValue {
  tags?: any;
  setTags: any;
}

export default function TagsInput({ tags, setTags }: TagValue) {
  const removeTags = (indexToRemove: number) => {
    const filter = tags?.filter(
      (_: string, index: number) => index !== indexToRemove
    );
    setTags(filter);
  };

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.currentTarget as HTMLInputElement).value;

    if (
      event.key === 'Enter' &&
      inputValue !== '' &&
      !tags?.includes(inputValue)
    ) {
      setTags((prevTags: any) => [...prevTags, inputValue]);
      event.currentTarget.value = '';
    }
  };

  return (
    <>
      <div className={styles.sectionTitle}>태그</div>
      <input
        className={styles.titleInput}
        type='text'
        onKeyUp={(e) => {
          {
            addTags(e);
          }
        }}
        placeholder='태그를 입력하세요'
      />

      <ul id='tags'>
        {tags?.map((tag: any, index: number) => (
          <li key={index} className={styles.hashtags}>
            <span className={styles.hashtagTitle}>#{tag}</span>
            <Image
              src={tagRemoveIcon}
              onClick={() => removeTags(index)}
              alt='remove_tag'
              className={styles.removeIcon}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
