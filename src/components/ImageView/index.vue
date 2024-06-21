<script setup>
import { useMouseInElement } from '@vueuse/core'
import { ref, watch } from 'vue'

// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]

//1. 通过小图下标切换大图
const activeIndex = ref(0) //记录下标值

const handleenter = (i) => {
  activeIndex.value = i
}

// 2.获取鼠标相对位置
const target = ref(null) //ref为标记元素，通过ref标记元素
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 3.控制滑块跟随鼠标移动
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY], () => {
  // console.log('鼠标移动了')

  //如果鼠标不在大图上
  if(isOutside.value) return
  
  //有效范围内控制滑块距离 
  //横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  //纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  //处理边界
  if (elementX.value < 100) {
    left.value = 0
  }
  if (elementX.value > 300) {
    left.value = 200
  }
  if (elementY.value < 100) {
    top.value = 0
  }
  if (elementY.value > 300) {
    top.value = 200
  }

  //控制大图的显示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2

})

</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-if="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!-- 绑定鼠标事件和动态类激活状态绑定 -->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="handleenter(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
     <!-- 样式的动态绑定必须用对象 -->
    <div class="large" v-if="!isOutside" :style="{
      backgroundImage: `url(${imageList[0]})`,
      backgroundPositionX: `${positionX}px`,
      backgroundPositionY: `${positionY}px`,
    }"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      //当鼠标悬停在<li>元素上时，鼠标指针会变为一个小手形状，通常表示这是一个可点击的元素。
      cursor: pointer;

      //鼠标悬停，&指父元素，父元素触发时，激活.active类
      &:hover,
      // 激活选中状态样式
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>