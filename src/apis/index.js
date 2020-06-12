import axios from 'axios';
const LOCAL_ADDRESS = 'http://localhost:8888/vision-baseball/';
const SERVER_ADDRESS = 'https://appliedvisionbaseball.com/';
const api_endpoint = SERVER_ADDRESS +
  'wp-admin/admin-ajax.php';
const BASE_URL = SERVER_ADDRESS;
const convert = (imgUrl, suffix) => imgUrl.replace('.png', suffix);

export const AuthenticateUser = async (email, password) => {
  const formData = new FormData();
  formData.append('action', 'authenticate_user');
  formData.append('email', email);
  formData.append('password', password);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  if (res.data.ID > 0) return true;
  else return false;
};

export const get_carousel_data = async (id) => {
  const formData = new FormData();
  formData.append('action', 'get_carousel');
  formData.append('id', id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  
  res.data.map((item) => item.img_url = BASE_URL + convert(item.img_url, '-300x169.png'));
  console.log(res.data);
  return res.data;
};

export const get_user_data = async (id) => {
  const formData = new FormData();
  formData.append('action', 'get_user_data');
  formData.append('user_id', id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res.data;
};

export const get_calendar_data = async (id) => {
  const formData = new FormData();
  formData.append('action', 'get_calendar_data');
  formData.append('calendar_id', id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  res.data.map((item) => {
    item.thumbnail = item.thumbnail.replace()
      .replace(/(<img ).+(src=")/gi, '')
      .replace(/(" class=).+(>)/gi, '');
    return item;
  });
  return res.data;
};

export const get_ranking_data = async (board_id) => {
  const formData = new FormData();
  formData.append('action', 'get_ranking_data');
  formData.append('board_id', board_id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  res.data.map((item) => {
    item.avatar = item.avatar.replace()
      .replace(/<img src="/gi, '')
      .replace(/(" width="96").+(>)/gi, '');
    return item;
  });
  
  return res.data;
};

export const get_bodybkcolor_data = async (board_id) => {
  const formData = new FormData();
  formData.append('action', 'get_bodybkcolor_data');
  formData.append('board_id', board_id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res.data;
};

export const get_level_data = async (post_id) => {
  const formData = new FormData();
  formData.append('action', 'get_level_data');
  formData.append('post_id', post_id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  
  res.data.image = res.data.image.map((item) => {item.url = BASE_URL + convert(item.url, '-150x150.png'); return item;});
  console.log(res.data);
  return res.data;
}