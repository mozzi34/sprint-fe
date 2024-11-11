import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleValueWithOnChange } from './ContentInput';

export default function PriceInput({
  values,
  onChange,
}: ArticleValueWithOnChange) {
  return (
    <>
      <div className={styles.sectionTitle}>판매가격</div>
      <input
        name='price'
        placeholder='판매 가격을 입력해 주세요'
        type='number'
        value={values.price}
        onChange={onChange}
        className={styles.titleInput}
      />
    </>
  );
}
