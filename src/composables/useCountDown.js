//封装倒计时逻辑函数

import { ref,computed, onUnmounted } from "vue"
import dayjs from "dayjs"

export const useCountDown = () => {
  let timer = null //定时器
  //1.响应式数据
  const time = ref(0)
  //格式化时间
  const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
  //2.开启倒计时函数
  const start = (currentTime) => {
    //开始倒计时逻辑
    //核心逻辑：每隔1秒钟减1
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(()=>{
    timer && clearInterval(timer)
  })
  //返回数据和函数
  return {
    formatTime,
    start
  }
}