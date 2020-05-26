import axios from 'axios';

const api_endpoint =
  'http://localhost:8888/vision-baseball/wp-admin/admin-ajax.php';
const BASE_URL = 'https://appliedvisionbaseball.com/';
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
  formData.append('action', 'get_carousel_data');
  formData.append('id', id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  const retValue = res.data.map((item) => BASE_URL + item);
  return retValue;
};


export const get_user_data = async (id) => {
  const formData = new FormData();
  formData.append('action', 'get_user_data');
  formData.append('user_id', id);
  const res = await axios.post(api_endpoint, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res.data;
}