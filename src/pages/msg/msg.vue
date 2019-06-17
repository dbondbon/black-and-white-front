<template>
  <div class="msg">
    
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
      
    };
  },
  mounted() {
    this.init();
  },
  init() {

  }
};
</script>

<style lang="less" scoped>
.msg {
  text-align: center;
}
</style>


