// 管理用户数据相关

import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore(
  'user',
  () => {
    //cartStore实例
    const cartStore = useCartStore()

    //1.定义管理用户数据的store，token等
    const userInfo = ref({})
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password }) //登录后返回的是用户信息
      userInfo.value = res.result
    }
    //3.退出时清除用户信息,因为配置过pinia持久化插件，piniaPluginPersistedstate，所以清除pinia的数据会把localStorage的数据也清除
    const clearUserInfo = () => {
      //退出登录：
      userInfo.value = {} //清除用户数据
      cartStore.clearCart() //清除本地购物车
    }
    //4.以对象的格式把store和action return出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true, //持久化插件配置项，默认存入localStorage
  })