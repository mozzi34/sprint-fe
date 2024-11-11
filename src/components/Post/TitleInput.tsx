import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleValueWithOnChange } from './ContentInput';

export default function TitleInput({
  values,
  onChange,
}: ArticleValueWithOnChange) {
  return (
    <>
      <div className={styles.sectionTitle}>상품명</div>
      <input
        name='title'
        placeholder='상품명을 입력해 주세요'
        value={values.title}
        onChange={onChange}
        className={styles.titleInput}
      />
    </>
  );
}
