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
          placeholder="请输入账号"
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
    <!-- <van-row type="flex" justify="end">
      <van-col span="10">
        <span>忘记密码</span>
      </van-col>
    </van-row> -->
    <van-row type="flex" justify="center">
      <van-col span="12">
        <span class="text1">还没有账号？</span>
        <span class="text2" @click="register">立即注册</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Button, Field, Toast } from "vant";
import md5 from 'js-md5';
import user from "@/api/user";
export default {
  name: "login",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast,
  },
  data() {
    return {
      username: "",
      password: "",
      submitFlag: 0
    };
  },
  methods: {
    register() {
       this.$router.push({path: "/register"});
    },
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
        password: md5(this.password),
      };
      this.submitFlag = 1;
      user.Login(data).then(res => {
        if( res.code == '1' ) {
          this.password = "";
          Toast.fail('账号或密码错误,请重新登录');
          this.submitFlag = 0;
        }else {       
          Toast.success('登录成功');
          window.localStorage["token"] = JSON.stringify(res.token);
          this.GLOBAL.user = res.user;
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
    padding: 40px 20px 0px 20px;
  }
  .login-submit {
    padding: 20px 20px 20px 30px;
  }
  .text1 {
    font-size: 15px;
  }
  .text2 {
    font-size: 17px;
  }
}
</style>


