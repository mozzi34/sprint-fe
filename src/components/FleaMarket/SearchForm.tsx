import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import searchIcon from '@/public/ic_search.png';
import styles from '../../styles/Fleamarket.module.css';
import Image from 'next/image';

export interface SearchFormValues {
  keyword: string | string[] | undefined;
}

export default function SearchForm({ keyword }: SearchFormValues) {
  const router = useRouter();
  const [value, setValue] = useState(keyword || '');

  function handleChange(e: any) {
    setValue(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!value) {
      router.push('/fleamarket');
      return;
    }
    router.push(`/fleamarket?keyword=${value}`);
  }

  useEffect(() => {
    setValue(keyword || '');
  }, [keyword]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.submit}>
        <Image
          src='/ic_search.png'
          alt='검색 아이콘'
          className={styles.icon}
          width={10}
          height={10}
        />
        <input
          name='keyword'
          value={value}
          onChange={handleChange}
          placeholder='검색어를 입력해 주세요'
          className={styles.searchInput}
        />
      </form>
    </>
  );
}