import httpInstance from "@/utils/http"

export function getCategory(){
    // 调用axios实例httpInstance，进行接口测试
    return httpInstance({
        url:'home/category/head'
    })
}