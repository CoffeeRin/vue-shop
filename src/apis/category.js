//用于面包屑和header的点击分类

//默认导出只有一个,可以取别名为request
import request from '@/utils/http'

// 一级分类
export const getCategoryAPI = (id) => {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}

// 二级分类页的面包屑导航数据
export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}