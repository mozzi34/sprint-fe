import axios from 'axios';
import { Tag } from '../../pages/fleamarket/edit/[id]';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/fleamarket',
});

interface FetchFleaMarketApiParams {
  keyword: string | string[] | undefined;
  sort: string | undefined;
  page: number | undefined;
}

export interface FetchFleaMarketApiContent {
  id?: string | string[] | undefined;
  title: string;
  content: string;
  images: File[] | string[];
  price: string | undefined;
  userId: string;
  tags: string[];
}

interface FetchFleaMarketApiId {
  id: string;
  userId: string | null;
}

export async function fetchFleaMarketBestApi() {
  try {
    const res = await instance.get(`/`, {
      params: {
        sort: 'favorite',
        limit: 4,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketApi({
  keyword,
  sort,
  page,
}: FetchFleaMarketApiParams) {
  try {
    const res = await instance.get(`/`, {
      params: {
        keyword: keyword || '',
        sort: sort,
        page: page,
        limit: 10,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketDetailApi({
  id,
  userId,
}: FetchFleaMarketApiId) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.get(`/${id}`, {
      headers: config.headers,
      params: { userId },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postFleaMarketArticleApi({
  title,
  content,
  images,
  price,
  userId,
  tags,
}: FetchFleaMarketApiContent) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId);

    images.forEach((file) => {
      formData.append('images', file);
    });

    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    if (typeof price === 'string') {
      formData.append('price', price);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.post(`/post`, formData, config);

    return res;
  } catch (error) {
    alert('게시물 등록에 실패했습니다.');
    console.error('Error posting data:', error);
  }
}

export async function editFleaMarketArticleApi({
  id,
  title,
  content,
  images,
  price,
  userId,
  tags,
}: FetchFleaMarketApiContent) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId);

    images?.forEach((file) => {
      formData.append('images', file);
    });

    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    if (typeof price === 'string') {
      formData.append('price', price);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.patch(`/${id}/edit`, formData, config);

    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
  }
}

export async function deleteFleaMarketArticleApi(
  id: string
): Promise<undefined> {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const res = await instance.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
