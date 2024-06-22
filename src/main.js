import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化的样式文件
import '@/styles/common.scss'

//引入懒加载指令插件并注册
import { lazyPlugin } from './directives'

//引入全局组件插件并且注册
import { componentPlugin } from './components'

//引入piniaPluginPersistedstate，pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//     console.log(res);
// })

const app = createApp(App)
const pinia = createPinia() //创建pinia实例

app.use(router) // 注册路由
app.use(lazyPlugin) //注册懒加载插件
app.use(componentPlugin) //注册全局组件插件
app.use(pinia) //注册pinia
pinia.use(piniaPluginPersistedstate) //注册pinia持久化插件

app.mount('#app')
