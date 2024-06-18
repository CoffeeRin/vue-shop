import httpInstance from "@/utils/http"

//命名一个方法调用httpInstance实例
export function getCategoryAPI() {
    return httpInstance({
        //默认为GET,GET请求可以省略methods
        url: '/home/category/head'
    })
}