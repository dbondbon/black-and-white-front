<template>
  <div class="chatFrame">
    <van-nav-bar :title=this.otherNickname left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished">
        <van-field
            v-for="msg in msgList"
            :key="msg.msgId"
            v-model="msg.msgContent"
            :label="msg.senderNickname"
            type="textarea"
            rows="1"
            disabled
            autosize
        />    
    </van-list>
    <div class="chatFrame-input">
        <van-field
            v-model="Message.msgContent"
                type="textarea"
                placeholder="最多255个字符"
                rows="1"
                autosize
            />
    </div>
    <div class="chatFrame-submit">
        <van-button type="primary" round size="small" @click="send">发送</van-button>
    </div>
  </div>
</template>

<script>
import msg from "@/api/msg";
import { List, Field, Button, Toast  } from "vant";
export default {
  name: "chatFrame",
  components: {
    [List.name]: List,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      msgList: [],
      finished: true,
      otherNickname: '',
      Message:{
        senderId:'',
        receiverId:'',
        msgContent:'',
      },
      otherId:'',
    };
  },
  mounted() {
      this.init();
  },
  created () {
      //定时器 自动请求
      setInterval(() => {
          this.init()
      }, 5000)
  },
  methods: {
    init() {
        this.otherNickname = this.$route.query.msg.senderNickname;
        if(this.$route.query.msg.senderId == this.GLOBAL.user.userId) {
            this.otherId = this.$route.query.msg.receiverId;
        } else {
            this.otherId = this.$route.query.msg.senderId;    
        }
        let data = {
            userId:this.GLOBAL.user.userId,
            otherId:this.otherId
        }
        msg.GetOne(data).then(res => {
            this.msgList = res.msgList;
            this.msgList.forEach(item => {
            if(item.senderId == this.GLOBAL.user.userId) {
              item.senderNickname = "我";
            }
          });
        });
    },
    back() {
      this.$router.push({ path: "/home/msg" });
    },
    send() {
      if(this.Message.msgContent == null || this.Message.msgContent == '') {
        Toast.fail("消息内容不能为空");
        return;
      }
      if(this.Message.msgContent.length > 255) {
        Toast.fail("消息字数超过限制");
        return;
      }
      this.Message.senderId = this.GLOBAL.user.userId;
      this.Message.receiverId = this.otherId;
      msg.Add(this.Message).then(res => {
        this.Message.msgContent = '';
        this.init();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.chatFrame {
    .chatFrame-input {
        padding: 20px;
        margin-top: 50px;
        background-color: #f2f3f5;
    }
    .chatFrame-submit {
        text-align: center;
    }
}
</style>


