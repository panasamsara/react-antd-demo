import axios from 'axios';
import { SERVER_URL as SERVER } from '@/config/config';
import qs from 'qs';
import { message, Spin } from 'antd';
import ReactDOM from 'react-dom/client';
 
// 创建axios实例对象
let Axios = axios.create({
  baseURL:"",
  timeout: 10000
})
// 設置post請求頭
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
 
// 當前正在請求的數量 // requestCount爲0，才建立loading, 避免重複建立
let requestCount = 0
// 顯示loading
function showLoading () {
  if (requestCount === 0) {
      var dom = document.createElement('div')
      dom.setAttribute('id', 'loading')
      dom.style.position = 'absolute'
      dom.style.top = '50%'
      dom.style.left = '50%'
      document.body.appendChild(dom)
      const root = ReactDOM.createRoot(dom);
      root.render(<Spin tip="努力加载中..." size="large"/>);
  }
  requestCount++
}
// 隱藏loading
function hideLoading () {
  requestCount--
  if (requestCount === 0) {
      document.body.removeChild(document.getElementById('loading'))
  }
}

// 请求拦截器
Axios.interceptors.request.use(config=>{
  // console.log(config,'请求配置项');
  // if(config.url !== '登录接口'){
  //   config.headers.Authorization = 'token值'
  // }
  let reg = /develop/
  const fullUrl = config.url.indexOf('http://') != -1 || config.url.indexOf('https://') != -1
  config.url = fullUrl || reg.test(process.env.NODE_ENV)
    ? config.url 
    : `${SERVER}${config.url}`
  
  if (config.headers.isLoading !== false) {
    showLoading()
  }
  return config
},error=>{
  alert('请求失败')
  // 判斷當前請求是否設置了不顯示Loading
  if (error.config.headers.isLoading !== false) {
    hideLoading()
  }
  return Promise.reject(error)
})
 
// 响应拦截器
Axios.interceptors.response.use(response=>{
  // 判斷當前請求是否設置了不顯示Loading
  if (response.config.headers.isLoading !== false) {
    hideLoading()
  }
  let res = response.data
  return res
},error=>{
  if (error.config.headers.isLoading !== false) {
    hideLoading()
  }
  return Promise.reject(error)
})
 
// 封装get方法并导出
export function get(url,params){
  return Axios.get(url,{
    params,
  })
}
// 封装postJSON方法 (发送json格式数据)
export function postJSON(url,data){
  return Axios.post(url,data)
}
// 封装post方法 (发送表单格式数据)
export function post(url,data){
  return Axios.post(url,qs.stringify(data))
}
 
// 导出axios实例
export default Axios