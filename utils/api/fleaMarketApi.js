import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/fleamarket',
});

export async function fetchFleaMarketBestApi() {
  try {
    const res = await instance.get(`/`, {
      params: {
        sort: 'favorite',
        limit: 3,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketApi({ keyword, sort, page }) {
  try {
    const res = await instance.get(`/`, {
      params: {
        keyword: keyword || '',
        sort: sort,
        page: page,
        limit: 5,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

export async function fetchFleaMarketArticleApi(id) {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// export async function postFleaMarketArticleApi({
//   title,
//   content,
//   price,
//   images,
//   tags,
//   userId,
// }) {
//   try {
//     const res = await instance.post(`/post`, {
//       title: title,
//       content: content,
//       price: price,
//       images: images || [],
//       tags: tags || [],
//       userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
//     });
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.error('Error posting data:', error);
//   }
// }

export async function postFleaMarketArticleApi({
  title,
  content,
  images,
  price,
  tags,
}) {
  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', '86d761e4-a9d0-4082-96dd-cf6f2c931673');

    images.forEach((file) => {
      formData.append('images', file);
    });

    formData.append('tags', tags);
    formData.append('price', price);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await instance.post(`/post`, formData, config);

    console.log(res);
    return res;
  } catch (error) {
    alert('게시물 등록에 실패했습니다.');
    console.error('Error posting data:', error);
  }
}

export async function editFleaMarketArticleApi({ title, content, id }) {
  try {
    const res = await instance.patch(`/${id}`, {
      title: title,
      content: content,
    });

    return res.data;
  } catch (error) {
    console.error('Error editing data:', error);
  }
}

export async function deleteFleaMarketArticleApi(id) {
  try {
    const res = await instance.delete(`/${id}`);

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
