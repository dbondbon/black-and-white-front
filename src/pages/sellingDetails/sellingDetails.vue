<template>
  <div class="sellingDetails">
    <van-nav-bar title="出售详情" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <van-cell-group class="headInput">
      <!-- <van-field v-model="goods.name" label="添加封面" placeholder="点击此区域上传封面" disabled /> -->
      <van-field v-model="goods.name" disabled clearable label="书名" />
      <van-field v-model="goods.price" disabled clearable label="售价"/>
      <van-field v-model="goods.code" disabled clearable label="商品编号" />
      <van-field v-model="goods.author" disabled clearable label="作者" />
      <van-field v-model="goods.publisher" disabled clearable label="出版社"/>
      <van-field v-model="sellerNickname" disabled clearable label="卖家昵称"/>
      <van-field
        v-model="goods.description"
        disabled
        label="卖家描述"
        type="textarea"
        rows="3"
      /> 
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat-o" text="联系卖家" @click="sendMsg"/>
      <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="viewCart"/>
      <van-goods-action-big-btn text="加入购物车" @click="addToCart"/>
      <van-goods-action-big-btn primary text="立即购买" @click="buyNow"/>
    </van-goods-action>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,Field } from "vant";
import user from "@/api/user";
export default {
  name: "sellingDetails",
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Field.name]: Field
  },
  data() {
    return {
        sellerNickname:'aaa',
        goods:{}
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
        this.goods = this.$route.query.goods;
        const data = {
         userId:this.$route.query.goods.userId
        };
        user.GetNickname(data).then(res => {
            this.sellerNickname = res.nickname;
        });
    },
    onClickLeft() {
      this.$router.push({ path: "/home/buy" });
    },
    sendMsg() {
      console.log("联系卖家");
    },
    viewCart() {
      console.log("查看购物车");
    },
    addToCart() {
      console.log("添加购物车");
    },
    buyNow() {
      console.log("立即购买");
    }
  }
};
</script>

<style lang="less" scoped>

</style>


