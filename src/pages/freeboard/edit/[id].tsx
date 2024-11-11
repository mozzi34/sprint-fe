import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleButton } from '../../../utils/Button';
import TitleInput from '../../../components/Post/TitleInput';
import ContentInput from '../../../components/Post/ContentInput';
import { useGetArticle, useEditArticle } from '../../../hooks/useFreeBoard';
import { useAuth } from '../../../utils/AuthProvider';
import { Article } from '../../fleamarket/edit/[id]';

export default function EditArticlePage() {
  const router = useRouter();
  const { user } = useAuth(true);
  const [isSubmit, setIsSubmit] = useState(true);
  const [values, setValues] = useState<Article>({
    title: '',
    content: '',
    images: [],
  });

  const { id } = router.query;
  const { data, isLoading } =
    id && typeof id === 'string'
      ? useGetArticle(id)
      : { data: null, isLoading: true };

  const { editFreeBoardArticle } = useEditArticle(id);

  const handleSubmit = () => {
    if (typeof id === 'string') {
      editFreeBoardArticle.mutate({
        id: id, // id가 string일 경우에만 호출
        title: values.title,
        content: values.content,
      });
    }

    const onChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;

      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      setIsSubmit(values.title.trim() !== '' && values.content.trim() !== '');
    };

    useEffect(() => {
      if (data) {
        setValues({
          title: data.title,
          content: data.content,
          images: data.images,
        });
      }
    }, [data]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className={styles.postLayout}>
          <div className={styles.header}>
            <span className={styles.title}>게시물 수정</span>
          </div>
          <ArticleButton
            disabled={!isSubmit}
            label='수정'
            onClick={handleSubmit}
          />
          <TitleInput values={values} onChange={onChange} />
          <ContentInput values={values} onChange={onChange} />
        </div>
      </>
    );
  };
}
