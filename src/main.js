import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化的样式文件
import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'

//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//     console.log(res);
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令v-img-lazy
app.directive('img-lazy', {
  mounted(el, binding) {
    //el:指令绑定的元素 img
    //binding：binding.value 指令等于号后面绑定的表达式的值 图片url（item.picture）
    console.log(el, binding.value)
    //判断是否进入视口useIntersectionObserver
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        // console.log(isIntersecting)
        if (isIntersecting) {
          //进入了视口区域，绑定的指令v-img-lazy给元素el添加属性src，item.picture就是binding.value
          //<img v-img-lazy="item.picture" alt="">
          el.src = binding.value
        }
      },
    )
  }
})
