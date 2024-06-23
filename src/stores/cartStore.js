// 购物车有关数据

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    //根据有无token判断登录条件
    const isLogin = computed(() => userStore.userInfo.token)

    //state购物车列表
    const cartList = ref([])

    //获取最新购物车列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI() //接口获取获取购物车列表
      cartList.value = res.result //接口购物车数据覆盖本地数据
    }

    //action添加购物车操作
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        //已登录的逻辑：
        await insertCartAPI({ skuId, count }) //接口加入购物车
        // const res = await findNewCartListAPI() //接口获取获取购物车列表
        // cartList.value = res.result //接口购物车数据覆盖本地数据
        updateNewList()
      } else {
        //未登录的逻辑：操作本地数据
        //已添加count
        //没有添加过count,直接push
        //思路：通过匹配传递过来的商品对象中的skuId能不能再cartList中找到，找到就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId) //找到这个item项，即这个商品
        if (item) {
          item.count++
        } else {
          cartList.value.push(goods)
        }
      }
    }

    //删除购物车操作
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //已登录删除购物车
        await delCartAPI([skuId]) //接口删除购物车
        // const res = await findNewCartListAPI() //接口获取获取购物车列表
        // cartList.value = res.result //接口购物车数据覆盖本地数据
        updateNewList()
      } else {
        //未登录本地删除思路：
        //1.找到要删除项的下标值(findIndex)-splice
        //2.找到数组的过滤方法-filter
        const index = cartList.value.findIndex(item => skuId === item.skuId) //找到要删除的下标
        cartList.value.splice(index, 1)
      }
    }

    //清除本地购物车
    const clearCart = ()=>{
      cartList.value = []
    }

    //单选功能
    const singeCheck = (skuId, selected) => {
      //通过skuId找到要修改的数据
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    //全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => item.selected = selected)
    }

    //计算属性
    //累加：cartList.value.reduce((a,c)=>a+c.count,0),a为累加总数，c为cartList的每一项
    //过滤：filter((item) => item.selected)
    //判断每一项:every((item) => item.selected === true)

    //1.总数
    const allCart = computed(() => cartList.value.reduce((all, cart) => all + cart.count, 0))
    //2.总价
    const allPrice = computed(() => cartList.value.reduce((all, cart) => all + cart.count * cart.price, 0))

    //单选框是否全选，根据单选框判断全选框
    const isAll = computed(() => cartList.value.every((item) => item.selected === true))

    //已选择数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((all, cart) => all + cart.count, 0))
    //已选择商品价格合计
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((all, cart) => all + cart.count * cart.price, 0))

    return {
      cartList,
      addCart,
      delCart,
      singeCheck,
      allCheck,
      clearCart,
      updateNewList,
      allCart,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice
    }
  },
  {
    persist: true //开启持久化默认配置
  }
)
