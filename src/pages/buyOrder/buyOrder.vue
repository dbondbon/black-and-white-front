<template>
  <div class="buyOrder">
    <van-nav-bar title="我下的订单" left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished" v-if="orderMap.length != 0"> 
        <div class="card" v-for="(value, key) in orderMap" :key="key">
          <van-card :title="value.name" :desc="value.author" :centered="true" @click="toDetails(value,key)">
            <div slot="price">
              <span class="bookPrice">￥{{value.price}}</span>
            </div>
            <div slot="thumb">
              <img src="../../assets/book.jpg" v-if="value.imgId == null || value.imgId == ''">
              <img :src="imgSrc+value.imgId" v-else>
            </div>
            <div slot="footer">
              <van-button size="mini" @click.native="deleteBuyOrder(value.goodsId)">联系卖家</van-button>
              <van-button size="mini" @click.native="deleteBuyOrder(value.goodsId)">删除</van-button>
            </div>
          </van-card>
        </div>
    </van-list>
  </div>
</template>

<script>
import order from "@/api/order";
import { List, Card, Button, Dialog } from "vant";
export default {
  name: "buyOrder",
  components: {
    [List.name]: List,
    [Card.name]: Card,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      orderMap:[],
      finished: true,
      imgSrc:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.imgSrc = this.GLOBAL.imgSrc;
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
    },
    deleteBuyOrder(goodsId) {
      console.log("删除订单，订单编号为："+goodsId);
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  padding: 10px 10px 0px 10px;
}
</style>


