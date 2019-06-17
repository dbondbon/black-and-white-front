<template>
  <div class="mine">
    <van-cell-group>
      <van-cell title="购物车" is-link @click="changeIsMine" icon="cart-o" to="/cart" />
      <van-cell title="我的待售" is-link  icon="balance-list-o" />
      <van-cell title="收到的订单" is-link icon="orders-o" to="/sellOrder"/>
      <van-cell title="我下的订单" is-link icon="description" to="/buyOrder"/>
      <van-cell title="设置" is-link  icon="setting-o" to="/setting" />
    </van-cell-group>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name: "mine",
  components: {
   [Icon.name]: Icon,
  },
  data() {
    return {
        
    };
  },
  mounted() {
  },
  methods: {
    changeIsMine() {
      this.GLOBAL.isMine = 1;
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
}
</style>


