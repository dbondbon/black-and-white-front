<template>
  <div class="msg">
    <van-list :finished="finished" v-if="msgList.length != 0">
      <van-cell 
      :title=msg.senderNickname 
      size="large" 
      v-for="msg in msgList" 
      :key="msg.msgId" 
      is-link
      @click="look(msg)"
      />
    </van-list>
    <span v-else>
      暂无消息
    </span>
  </div>
</template>

<script>
import msg from "@/api/msg";
import { List } from "vant";
export default {
  name: "msg",
  components: {
    [List.name]: List
  },
  data() {
    return {
      finished: true,
      msgList:{},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      msg.GetAll(this.GLOBAL.user.userId).then(res => {
        if(res.code == 1) {
          console.log("暂无消息");
        } else {
          this.msgList = res.msgList
          this.msgList.forEach(item => {
            if(item.senderId == this.GLOBAL.user.userId) {
              item.senderNickname = item.receiverNickname;
            }
          });
        }
      });
    },
    look(msg) {
      this.$router.push({ path: "/chatFrame" , query:{msg:msg}});
    }
  }
};
</script>

<style lang="less" scoped>
.msg {
}
</style>


