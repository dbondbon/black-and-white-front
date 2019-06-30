<template>
  <div class="sellOrder">
    <van-nav-bar title="收到的订单" left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished" v-if="orderList.length != 0">
      <van-cell
        title="订单编号"
        :value="order.orderId"
        is-link
        v-for="order in this.orderList"
        :key="order.orderId"
      />
    </van-list>
  </div>
</template>

<script>
import order from "@/api/order";
import { List } from "vant";
export default {
  name: "sellOrder",
  components: {
    [List.name]: List
  },
  data() {
    return {
      orderList: [],
      finished: true
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
      order.SellList(this.GLOBAL.user.userId).then(res => {
        if (res.code == "1") {
          console.log("暂无订单");
        }
        this.orderList = res.orderList;
      });
    },
    back() {
      this.$router.push({ path: "/home/mine" });
    }
  }
};
</script>

<style lang="less" scoped>
</style>


