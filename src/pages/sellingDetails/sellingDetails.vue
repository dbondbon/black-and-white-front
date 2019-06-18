<template>
  <div class="sellingDetails">
    <van-nav-bar title="出售详情" left-text="返回" left-arrow @click-left="back"/>

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
      <van-goods-action-mini-btn v-if="this.count==0" to="/cart" icon="cart-o" text="购物车"/>
      <van-goods-action-mini-btn v-else :info=this.count to="/cart" icon="cart-o" text="购物车"/>
      <van-goods-action-big-btn text="加入购物车" @click="addToCart"/>
      <van-goods-action-big-btn primary text="立即购买" @click="buyNow"/>
    </van-goods-action>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Field, Toast,Dialog } from "vant";
import user from "@/api/user";
import cart from "@/api/cart";
import order from "@/api/order";
export default {
  name: "sellingDetails",
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Toast.name]: Dialog
  },
  data() {
    return {
        sellerNickname:'',
        goods:{},
        count:0,
        sellerId:''
    };
  },
  mounted() {
      this.init();
      this.getCartCount();
  },
  methods: {
    init() {
        if(this.GLOBAL.previousStatus == 0) {
          this.goods = this.GLOBAL.goods;
          let data = {
          userId:this.GLOBAL.goods.userId
          };
          user.GetNickname(data).then(res => {
              this.sellerNickname = res.nickname;
              this.GLOBAL.sellerNickname = this.sellerNickname;
              this.sellerId = this.goods.userId;
          });
        } else {
          this.goods = this.GLOBAL.cartGoods;
          let data = {
          userId:this.GLOBAL.cartGoods.userId
          };
          user.GetNickname(data).then(res => {
              this.sellerNickname = res.nickname;
              this.GLOBAL.sellerNickname = this.sellerNickname;
              this.sellerId = this.goods.userId;
          });
        }  
    },
    getCartCount() {
      let data = {
        userId:this.GLOBAL.user.userId,
      }
      cart.List(data).then(res => {
        this.count = res.cartList.length;
      });
    },
    back() {
      if(this.GLOBAL.previousStatus == 0) {
        this.$router.push({ path: "/home/buy" });
      } else {
        this.$router.push({ path: "/cart" });
      }
    },
    sendMsg() {
      this.GLOBAL.lastPath = "/".concat(this.$route.name)
      this.$router.push({ path: "/sendMsg" , query:{receiverId:this.sellerId}});
    },
    addToCart() {
      let data = {
         userId:this.GLOBAL.user.userId,
         goodsId:this.GLOBAL.goods.goodsId
      };
      cart.Add(data).then(res => {
        Toast('恭喜您，书籍已添加至购物车');
        this.getCartCount();
      });
    },
    buyNow() {
      Dialog.confirm({
          message: "确定购买当前所选？",
          confirmButtonText:"确定购买",
          cancelButtonText:"取消"
        })
          .then(() => {
              let data = {
                goodsId:this.goods.goodsId,
                sellerId:this.sellerId,
                buyerId:this.GLOBAL.user.userId,
              };
              console.log(data)
              order.Add(data).then(res => {
                Toast('恭喜您，书籍已下单，请您尽快联系卖家进行交易');
                this.init();
                this.totalPrice = 0;
              });
          })
          .catch(() => {
            return;
          });
    }
  }
};
</script>

<style lang="less" scoped>

</style>


