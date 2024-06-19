// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router' //使用路由

export const useCategory = () => {
  //获取分类数据
  const categoryData = ref({})
  // 获取路由实例,用于获取路由参数
  const route = useRoute()

  //默认参数为route.params.id
  const getcategoryData = async (id = route.params.id) => {
    const res = await getCategoryAPI(id) //route.params.id：因为路由用占位符（params传参），所以用route.params.id获取当前路由id
    categoryData.value = res.result
    console.log("res", res)
  }

  onMounted(() => {
    getcategoryData()
  })

  //目标:路由参数变化时，可以把分类数据接口重新发送getcategoryData
  //to:目标路由对象
  onBeforeRouteUpdate((to) => {
    console.log('路由变化了')
    //使用最新的路由参数请求最新的分类数据
    getcategoryData(to.params.id)
  })

  return { categoryData }
}