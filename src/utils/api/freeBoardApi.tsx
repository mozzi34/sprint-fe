import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/freeboard',
});

export async function fetchFreeBoardBestApi() {
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

export async function fetchFreeBoardApi({
  keyword,
  sort,
  page,
}: {
  keyword: string | string[] | undefined;
  sort: string;
  page: number | unknown;
}) {
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

export async function fetchFreeBoardArticleApi(id: string) {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postFreeBoardArticleApi({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) {
  try {
    const res = await instance.post(`/post`, {
      title: title,
      content: content,
      // images: images || [],
      // tags: tags || [],
      userId: userId,
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

// export async function postArticleApi({
//   title,
//   content,
//   image,
//   price,
//   tags,
//   category,
// }) {
//   try {
//     const formData = new FormData();

//     formData.append('title', title);
//     formData.append('content', content);
//     formData.append('category', category);
//     formData.append('userId', '86d761e4-a9d0-4082-96dd-cf6f2c931673');

//     formData.append('images', image);

//     // if (tags) {
//     //   tags.forEach((tag) => {
//     //     formData.append('tags', tag);
//     //   });
//     // }
//     // if (priceValue) {
//     //   formData.append('price', price || null);
//     // }
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     const res = await axios.post(`${baseUrl}`, formData);

//     console.log(res);
//     return res;
//   } catch (error) {
//     alert('게시물 등록에 실패했습니다.');
//     console.error('Error deleting data:', error);
//   }
// }

export async function editArticleApi({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) {
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

export async function deleteArticleApi(id: string) {
  try {
    const res = await instance.delete(`/${id}`);

    return {};
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
