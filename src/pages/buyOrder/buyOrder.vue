<template>
  <div class="buyOrder">
    <van-nav-bar title="我下的订单" left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished" v-if="orderList.length != 0"> 
        <van-cell title="订单编号" :value=order.orderId is-link v-for="order in this.orderList" :key="order.orderId" @click="toDetails(order)"/>
    </van-list>
  </div>
</template>

<script>
import order from "@/api/order";
import { List } from "vant";
export default {
  name: "buyOrder",
  components: {
    [List.name]: List
  },
  data() {
    return {
      orderList: [],
      finished: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      order.BuyList(this.GLOBAL.user.userId).then(res => {
        if (res.code == "1") {
          console.log("暂无订单");
        } 
        this.orderList = res.orderList;
      });
    },
    back() {
      this.$router.push({ path: "/home/mine" });
    },
    toDetails(order) {
      this.$router.push({ path: "/buyOrderDetails", query: {order:order} });
    }
  }
};
</script>

<style lang="less" scoped>
</style>


