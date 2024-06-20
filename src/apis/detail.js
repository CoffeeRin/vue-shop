//商品详情相关接口

import request from '@/utils/http'

export const getDetail = (id) => {
  return request({
    url:'/goods',
    params:{
      id
    }
  })
}