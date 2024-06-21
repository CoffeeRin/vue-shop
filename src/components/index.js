//把components中的所有组件进行全局注册
//通过插件的方式

import ImageView from './ImageView/index.vue'
import Sku from './Sku/index.vue'

export const componentPlugin = {
  install(app){
    //app.component('组件名',组件配置对象)
    app.component('ShopImageView',ImageView)
    app.component('ShopSku',Sku)
  }
}
