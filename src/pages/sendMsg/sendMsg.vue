<template>
  <div class="sendMsg">
    <van-nav-bar title="我要留言" left-text="返回" left-arrow @click-left="back"/>

    <van-cell-group>
      <van-field
        v-model="Message.msgContent"
        label="留言"
        type="textarea"
        placeholder="最多255个字符"
        rows="8"
        autosize
      />
    </van-cell-group>

    <div class="submit">
      <van-button type="primary" round size="large" @click="send">发布留言</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Dialog, Toast } from "vant";
import msg from "@/api/msg";
export default {
  name: "msg",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data() {
      return {
          Message:{
            senderId:'',
            receiverId:'',
            msgContent:'',
          },
      }
  },
  methods: {
    back() {
      this.$router.push({ path: this.GLOBAL.lastPath });
    },
    send() {
      if(this.Message.msgContent == null || this.Message.msgContent == '') {
        Toast.fail("留言内容不能为空");
        return;
      }
      if(this.Message.msgContent.length > 255) {
        Toast.fail("留言字数超过限制");
        return;
      }
      this.Message.senderId = this.GLOBAL.user.userId;
      this.Message.receiverId = this.$route.query.receiverId;
      msg.Add(this.Message).then(res => {
        Dialog.confirm({
          title: "发布成功",
          message: "是否继续发布",
          confirmButtonText:"是",
          cancelButtonText:"否"
        })
          .then(() => {
             this.Message.msgContent = '';
          })
          .catch(() => {
            this.back();
          });
      });
    }
  }
};
</script>


