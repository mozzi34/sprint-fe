import axios from 'axios';

interface FavoriteValues {
  articleId: string;
  userId?: string;
}

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/favorite',
});

let accessToken;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  accessToken = localStorage.getItem('accessToken');
}

// export async function postFavoriteApi({ articleId, userId, accessToken }) {
export async function postFavoriteApi({ articleId }: FavoriteValues) {
  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   params: { userId },
    // };

    // const res = await instance.post(`/${articleId}`, {}, config);
    const res = await instance.post(`/${articleId}`, {});

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteFavoriteApi({ articleId, userId }: FavoriteValues) {
  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };

    const res = await instance.delete(`/${articleId}`, {
      params: { userId },
    });

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
