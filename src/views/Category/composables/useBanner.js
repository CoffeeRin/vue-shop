// 封装banner轮播图相关代码
import { ref, onMounted } from 'vue'
import {getBannerAPI} from '@/apis/home'

export const useBanner = () => {

  //获取banner数据
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.result
    // console.log(res.result)
  }

  onMounted(() => {
    getBanner()
  })

  return {bannerList}
}