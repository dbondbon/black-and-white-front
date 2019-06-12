<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../assets/logo.png" class="login-img"/>
    </div>
    <div class="login-input">
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          left-icon="manager"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          clearable
          type="password"
          placeholder="请输入密码"
          left-icon="lock"
        />
      </van-cell-group>
    </div>
    <div class="login-submit">
      <van-button type="primary" v-if="submitFlag==0" round size="large" @click="submit">登录</van-button>
      <van-button type="primary" v-else round disabled size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field,Toast,Cell, CellGroup } from "vant";
import user from "@/api/user";
export default {
  name: "login",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      username: "",
      password: "",
      submitFlag: 0
    };
  },
  methods: {
    submit() {
      if(this.username==''){
        Toast("请输入用户名");
        return;
      }
      if(this.password==''){
        Toast("请输入密码");
        return;
      }
      const data = {
        username: this.username,
        password: this.password,
      };
      this.submitFlag = 1;
      user.Login(data).then(res => {
        if( res==null ) {
          this.password = "";
          Toast.fail('账号或密码错误,请重新登录');
          this.submitFlag = 0;
        }else {       
          Toast.success('登录成功');
          setTimeout(() => {
            this.$router.push({path: "/home"});
          },1000)     
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  .login-logo {
    padding-left: 40px;
    padding-top:100px;
    .login-img {
      height: 60px;
    }   
  }
  .login-input {
    padding: 40px 30px 0px 30px;
  }
  .login-submit {
    padding: 30px;
  }
}
</style>


