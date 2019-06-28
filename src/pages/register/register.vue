<template>
  <div class="register">
    <van-nav-bar title="注册账号" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <van-cell-group class="headInput">
      <van-field v-model="user.username"  label="账号" disabled/>
      <van-field v-model="user.nickname" required clearable label="昵称" placeholder="请输入昵称"/>
      <van-field
        v-model="user.password"
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="confirmPassword"
        clearable
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
      />
    </van-cell-group>

    <div class="submit">
      <van-button type="primary" v-if="submitFlag==0" round size="large" @click="submit">注册</van-button>
      <van-button type="primary" v-else round disabled size="large">注册</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field, Toast } from "vant";
import user from "@/api/user";
import md5 from 'js-md5';
export default {
  name: "register",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      submitFlag: 0,
      confirmPassword: "",
      user: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  mounted() {
    this.getUsername();
  },
  methods: {
    getUsername() {
        user.GetUsername().then(res =>{
            this.user.username = res.user.username;
        });
    },
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
    submit() {
      if (this.user.nickname == null || this.user.nickname == "") {
        Toast.fail("昵称不能为空");
        return;
      }
      if (this.user.nickname.length > 11 ) {
        Toast.fail("昵称过长");
        return;
      }
      if (this.user.password == null || this.user.password == "") {
        Toast.fail("密码不能为空");
        return;
      }
      if (this.user.password.length > 20) {
        Toast.fail("密码过长");
        return;
      }
      if (this.confirmPassword == null || this.confirmPassword == "") {
        Toast.fail("请输入确认密码");
        return;
      }
      if (this.confirmPassword != this.user.password) {
        Toast.fail("两次输入的密码不一致，请重新输入");
        return;
      }
      const data = {
        nickname: this.user.nickname,
        username: this.user.username,
        password: md5(this.user.password),
      };
      this.submitFlag = 1;
      user.Register(data).then(res => {
          if(res.code == '1') {
              Toast.success("该昵称已被占用，请尝试其他昵称");
              this.user.nickname = '';
          } else {
               Toast.success("注册成功，请记住您的账号并使用其进行登录");
                setTimeout(() => {
                    this.$router.push({ path: "/login" });
                }, 1000);
          }
      });
    }
  }
};

          
</script>

<style lang="less" scoped>
.register {
}
</style>


