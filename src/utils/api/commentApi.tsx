import axios from 'axios';
import { Page } from '../../hooks/useComments';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/comment/',
});

export interface GetCommentsValue {
  articleId: string | string[] | undefined;
  category: string;
  cursorId: unknown;
}

export interface EditCommentsValue {
  id: string;
  editComment: string;
}

export interface PostCommentValue {
  category: string;
  articleId: string;
  comment: string;
  userId: string;
}

export interface DeleteCommentValue {
  category: string;
  articleId: string;
  comment: string;
  userId: string;
}

export async function fetchCommentsApi({
  articleId,
  category,
  cursorId,
}: GetCommentsValue): Promise<Page> {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.get(`${category}/${articleId}`, {
      headers: config.headers,
      params: { limit: 5, cursor: cursorId },
    });

    return {
      comments: res.data.comments || [],
      totalCount: res.data.totalCount || 0,
    } as Page;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      comments: [],
      totalCount: 0,
    };
  }
}

export async function postCommentApi({
  category,
  articleId,
  comment,
  userId,
}: PostCommentValue) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.post(
      `${category}/${articleId}`,
      {
        content: comment,
        articleId: articleId,
        userId: userId,
      },
      config
    );

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function editCommentApi({ id, editComment }: EditCommentsValue) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.patch(
      `${id}`,
      {
        content: editComment,
      },
      config
    );
    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
    throw error;
  }
}

export async function deleteCommentApi(targetId: string) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await instance.delete(`${targetId}`, config);
    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
  }
}
