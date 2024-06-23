// 购物车有关数据

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

    //删除购物车操作
    const delCart = (skuId) => {
      //思路：
      //1.找到要删除项的下标值(findIndex)-splice
      //2.找到数组的过滤方法-filter
      const index = cartList.value.findIndex(item => skuId === item.skuId) //找到要删除的下标
      cartList.value.splice(index, 1)
    }

    //计算属性,cartList.value.reduce((a,c)=>a+c.count,0),a为累加总数，c为cartList的每一项
    //1.总数
    const allCart = computed(() => cartList.value.reduce((all, cart) => all + cart.count, 0))
    //2.总价
    const allPrice = computed(() => cartList.value.reduce((all, cart) => all + cart.count * cart.price, 0))

    //单选功能
    const singeCheck = (skuId, selected) => {
      //通过skuId找到要修改的数据
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    return {
      cartList,
      addCart,
      delCart,
      allCart,
      allPrice,
      singeCheck
    }
  },
  {
    persist: true //开启持久化默认配置
  }
)
