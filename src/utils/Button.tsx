import styles from '../styles/Button.module.css';

interface ButtonProps {
  disabled?: boolean;
  onClick: any;
  label: string;
}

export function CommentButton({ disabled, onClick, label }: ButtonProps) {
  return (
    <div className={styles.buttonLayout}>
      <button
        disabled={disabled}
        className={!disabled ? styles.commentSubmitBtn : styles.commentBtn}
        onClick={onClick}
        type='button'
      >
        {label}
      </button>
    </div>
  );
}

export function CommentCancelButton({ onClick, label }: ButtonProps) {
  return (
    <>
      <div className={styles.buttonLayout}>
        <button className={styles.cancelBtn} onClick={onClick} type='button'>
          {label}
        </button>
      </div>
    </>
  );
}

export function ArticleButton({ disabled, onClick, label }: ButtonProps) {
  return (
    <>
      <div className={styles.buttonLayout}>
        <button
          disabled={disabled}
          className={!disabled ? styles.articleSubmitBtn : styles.articleBtn}
          onClick={onClick}
          type='button'
        >
          {label}
        </button>
      </div>
    </>
  );
}

export function NavLogButton({ onClick, label }: ButtonProps) {
  return (
    <>
      <div className={styles.buttonLayout}>
        <button className={styles.navBtn} onClick={onClick} type='button'>
          {label}
        </button>
      </div>
    </>
  );
}
