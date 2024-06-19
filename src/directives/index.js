//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    //懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el:指令绑定的元素 img
        //binding：binding.value 指令等于号后面绑定的表达式的值 图片url（item.picture）
        console.log(el, binding.value)
        //判断是否进入视口useIntersectionObserver
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              //进入了视口区域，绑定的指令v-img-lazy给元素el添加属性src，item.picture就是binding.value
              //<img v-img-lazy="item.picture" alt="">
              el.src = binding.value
              stop() //监听加载图片完毕，停止监听避免造成内存浪费
            }
          },
        )
      }
    })
  }
}