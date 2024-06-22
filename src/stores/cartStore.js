// 购物车有关数据

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    //state购物车列表
    const cartList = ref([])

    //action添加购物车操作
    const addCart = (goods) => {
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
    return {
      cartList,
      addCart
    }
  },
  {
    persist: true //开启持久化默认配置
  }
)
