<template>
  <div class="setting">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="back"/>

    <div class="userInfo">
        <van-cell-group>
      <van-cell title="账号" is-link  v-model="username"/>
      <van-cell title="昵称"  is-link  v-model="nickname"/>
    </van-cell-group>
    </div>

    <div class="submit">
      <van-button type="danger"  round size="large" @click="exit">退出登录</van-button>
    </div>

  </div>
</template>


<script>
import { Field, Button, Dialog } from "vant";
export default {
  name: "setting",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  data() {
      return {
          username:'',
          nickname:'',
      }
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
        this.username = this.GLOBAL.user.username;
        this.nickname = this.GLOBAL.user.nickname;
    },
    back() {
      this.$router.push({ path: "/home/mine" });
    },
    exit() {
        Dialog.confirm({
          message: "确定退出登录？",
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        })
          .then(() => {
              this.GLOBAL.user = null;
              localStorage.clear();  //清空token
              this.$router.push({ path: "/login" });
          })
          .catch(() => {
            return;
          });
      },
    }
}
</script>

<style lang="less" scoped>
.setting {
    .userInfo {
        padding: 0px 20px 20px 5px;
    }
}
</style>

