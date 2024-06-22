//axios基础的封装
//导出的httpInstance实例为apis服务
import axios from 'axios'
//只使用组件 API
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

//创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//拦截器，e代表error

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => { return Promise.reject(e) })

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误提示  
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance