//默认导出直接用，不需要结构
import httpInstance  from '@/utils/http'

//获取banner
export function getBannerAPI() {
  return httpInstance({
    url: 'home/banner'
  })
}