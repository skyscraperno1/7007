import axios from "axios";

// const BASE_URL = 'https://7007.ai'
const BASE_URL = 'http://localhost:3000'
const Axios = axios.create({
  baseURL: BASE_URL
})

Axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) {
      config.headers.Authorization = token
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

const Ajax = (req) => {
  const { url, method, params, data } = req
  return new Promise((res, rej) => {
    Axios.request({
      url,
      method: method || 'GET',
      data: data || {},
      params: params || {},
    }).then((result) => {
        res(result.data)
    }).catch((e) => {
        rej(e.data)
    })
})
}
export default Ajax

