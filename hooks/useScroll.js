import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export default function useScroll({ comment, loading, hasMore }) {
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !canScroll) {
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, canScroll, comment]);

  return { canScroll };
}
