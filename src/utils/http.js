//axios基础的封装
//导出的httpInstance实例为apis服务
import axios from 'axios'
import router from '@/router'

//只使用组件 API
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

//引入pinia(user)
import { useUserStore } from '@/stores/user'

//创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//拦截器，e代表error

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1.获取pinia中user数据
  const userStore = useUserStore()
  //2.按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}` //请求的congfig拼接token到header上
  }
  return config
}, e => { return Promise.reject(e) })

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  //统一错误提示  
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //401token失效处理
  //1.清除本地用户数据
  //2.跳转到登录页
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance