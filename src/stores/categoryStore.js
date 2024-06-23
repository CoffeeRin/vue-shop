import { defineStore } from "pinia"
import { getCategoryAPI } from '@/apis/layout'
import { ref } from "vue"

export const useCategoryStore = defineStore('category', () => {
    //导航列表的数据管理
    //stete 导航列表数据
    const categoryList = ref([])  // 分类列表数据

    //action 获取导航数据的方法
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }

    return {
        categoryList,
        getCategory
    }
})