//默认导出直接用，不需要结构
import httpInstance from '@/utils/http'

//获取banner轮播图数据
export const getBannerAPI = () => {
  return httpInstance({
    url: 'home/banner'
  })
}

//获取New，新鲜好物
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

//获取人气推荐
export const getHotAPI = () => {
  return httpInstance({
    url: 'home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}