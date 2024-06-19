//用于面包屑和header的点击分类

//默认导出只有一个,可以取别名为request
import request from '@/utils/http'

export const getCategoryAPI = (id) => {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}