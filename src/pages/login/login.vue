<template>
    <div class="login">
        <div class="submit">
        <van-button type="primary" round size="large">登录</van-button>
        </div>
    </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "Login",
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      username: "",
      password: "",
      submitFlag:0
    };
  },
}
</script>

<style lang="less" scoped>
.login {
    .submit {
       padding: 20px;
    }
}
</style>


