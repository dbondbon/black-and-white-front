<template>
  <div class="home">
    <router-view/>
    <van-tabbar route v-model="active">
      <van-tabbar-item name="buy" replace to="buy"  icon="search">买书</van-tabbar-item>
      <van-tabbar-item name="sell" replace to="/sell" icon="gold-coin">卖书</van-tabbar-item>
      <van-tabbar-item name="msg" replace to="msg" icon="comment">消息</van-tabbar-item>
      <van-tabbar-item name="cart" replace to="cart" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item name="mine" replace to="mine" icon="manager">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";
export default {
  name: "buy",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  data() {
    return {
      active:null
    };
  }
};
</script>

<style lang="less" scoped>
.buy {
  text-align: center;
}
</style>


