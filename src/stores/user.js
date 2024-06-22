// 管理用户数据相关

import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  //1.定义管理用户数据的store
  const userInfo = ref({})
  //2.定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password }) //登录后返回的是用户信息
    userInfo.value = res.result
  }
  //3.以对象的格式把store和action return出去
  return{
    userInfo,
    getUserInfo
  }
})