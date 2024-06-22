<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

const userStore = useUserStore() //store实例
const router = useRouter() //router实例

const logout = () => {
  // console.log('logout')
  //退出登录业务逻辑实现
  //1.清除用户信息
  userStore.clearUserInfo()
  //2.跳转到登录页
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模版渲染，根据登录状态显示不同列表 -->
        <!-- 根据token判断登录状态 -->
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-a-appround4"></i>{{ userStore.userInfo.account }}</a></li>
          <li>
            <el-popconfirm @confirm="logout" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a>退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end; //末端对齐
    align-items: center; //垂直方向居中

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>