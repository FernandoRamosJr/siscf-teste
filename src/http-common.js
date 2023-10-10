import axios from "axios";

const axiosApiInstance = axios.create({
    baseURL: "/siscf-api",
    headers: {
      "Content-type": "application/json",
    }
 });

axiosApiInstance.interceptors.request.use(
  async config => {    
    if (!config.url.includes('/auth')) {
      config.headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf8'
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {      
  const originalRequest = error.config;
  console.log(error);
  if (error.response.status === 401 && !originalRequest._retry) {
    alert('Você não tem permissão para executar essa ação! '); 
  }
  
  if (error.response.status === 403 && !originalRequest._retry) {
    sessionStorage.removeItem('token'); 

    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;