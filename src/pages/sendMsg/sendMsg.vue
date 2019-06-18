<template>
  <div class="sendMsg">
    <van-nav-bar title="我要留言" left-text="返回" left-arrow @click-left="back"/>

    <van-cell-group>
      <van-field
        v-model="message"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        rows="4"
        autosize
      />
    </van-cell-group>

    <div class="submit">
      <van-button type="primary" round size="large" @click="send">发布留言</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Dialog } from "vant";
export default {
  name: "msg",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  data() {
      return {
          
      }
  },
  methods: {
    back() {
      this.$router.push({ path: this.GLOBAL.lastPath });
    },
    send() {
      console.log("发送留言");
    }
  }
};
</script>


