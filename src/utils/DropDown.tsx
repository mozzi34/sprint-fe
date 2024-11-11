import styles from '../styles/DropDown.module.css';
import { useEffect, useRef } from 'react';

interface DropDownValues {
  firstAction: any;
  secondAction: any;
  onClose: any;
}

export default function DropDown({
  firstAction,
  secondAction,
  onClose,
}: DropDownValues) {
  const dropDownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.dropDown} ref={dropDownRef}>
      <div
        className={
          firstAction.label === '최신순'
            ? styles.dropDownRecent
            : styles.dropDownEdit
        }
        onClick={firstAction.onClickHandler}
      >
        {firstAction.label}
      </div>
      <div
        className={
          firstAction.label === '최신순'
            ? styles.dropDownFavorite
            : styles.dropDownDelete
        }
        onClick={secondAction.onClickHandler}
      >
        {secondAction.label}
      </div>
    </div>
  );
}
