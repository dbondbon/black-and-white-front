<template>
  <div class="buyOrder">
    <van-nav-bar title="我下的订单" left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished" v-if="orderMap.length != 0"> 
        <van-cell title="订单编号" :value="key" is-link v-for="(value, key) in orderMap" :key="key" @click="toDetails(value,key)"/>
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
      orderMap:[],
      finished: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      order.BuyList(this.GLOBAL.user.userId).then(res => {
        this.orderMap = res.orderMap;
        console.log(this.orderMap);
      });
    },
    back() {
      this.$router.push({ path: "/home/mine" });
    },
    toDetails(value, key) {
      this.$router.push({ path: "/buyOrderDetails", query: {goods:value, code:key} });
    }
  }
};
</script>

<style lang="less" scoped>
</style>


