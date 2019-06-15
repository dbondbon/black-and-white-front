<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="back"/>
  </div>
</template>

<script>
import cart from "@/api/cart";
export default {
  name: "cart",
  components: {
   
  },
  data() {
    return {
      cartList:[]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let data = {
        userId:this.GLOBAL.user.userId,
      }
      cart.List(data).then(res => {
        this.cartList = res.cartList;
      });
    },
    back() {    
      this.$router.push({ path: "/sellingDetails" });
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  text-align: center;
}
</style>


