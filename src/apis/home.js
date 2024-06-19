//默认导出直接用，不需要结构
import httpInstance from '@/utils/http'

//获取banner轮播图数据
//params = {}表示默认值为对象
export const getBannerAPI = (params = {}) => {
  //默认为1，商品为2。各分类页轮播图相同
  const { distributionSite = '1' } = params
  return httpInstance({
    url: 'home/banner',
    params: {
      distributionSite // 参数，默认为1
    }
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