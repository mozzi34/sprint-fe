import SearchForm from '../../components/FreeBoard/SearchForm';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/FreeBoard.module.css';
import DropDown from '../../utils/DropDown';
import { useState } from 'react';
import { ListHeaderValues } from '../FleaMarket/ProductListHeader';

export default function ArticleListHeader({
  keyword,
  setOrderBy,
}: ListHeaderValues) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [orderByText, setOrderByText] = useState('최신순');

  const handleDropDown = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleOrderByClick = (orderBy: string) => {
    setOrderBy(orderBy);
    setOrderByText(orderBy === 'recent' ? '최신순' : '좋아요순');
  };

  return (
    <>
      <div className={styles.listHeader}>
        {keyword ? (
          <span className={styles.title}>검색 결과</span>
        ) : (
          <span className={styles.title}>게시글</span>
        )}
        <Link href='/freeboard/post'>
          <Image src='/post_btn.png' alt='글쓰기 버튼' width={10} height={10} />
        </Link>
      </div>
      <div className={styles.menu}>
        <SearchForm keyword={keyword} />
        <div className={styles.dropDownBoxLayout} onClick={handleDropDown}>
          <div className={styles.webDropDOnwBox}>
            <div className={styles.dropDownBoxText}>{orderByText}</div>
            <Image
              src='/ic_arrow_down.png'
              alt='아래 화살표'
              className={styles.dropDownArrow}
              width={10}
              height={10}
            />
          </div>
          <Image
            src='/btn_mobile_sort.png'
            alt='모바일 드롭다운 버튼'
            className={styles.dropDownMobile}
            width={10}
            height={10}
          />
          {isShowDropDown && (
            <div className={styles.dropDownLayout}>
              <DropDown
                firstAction={{
                  onClickHandler: () => handleOrderByClick('recent'),
                  label: '최신순',
                }}
                secondAction={{
                  onClickHandler: () => handleOrderByClick('favorite'),
                  label: '좋아요순',
                }}
                onClose={() => setIsShowDropDown(false)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
