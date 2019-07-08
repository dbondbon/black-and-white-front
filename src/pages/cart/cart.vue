<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="back"/>

    <van-list :finished="finished">
      <van-checkbox-group v-model="resultList" :change="changeResult(resultList)">
        <van-checkbox
          v-for="goodsItem in goodsList"
          :key="goodsItem.goodsId"
          :name="goodsItem.goodsId"
        > 
        <div class="card">
          <van-card :title="goodsItem.name" :desc="goodsItem.author" :centered="true" @click="sellingDetails(goodsItem)">
            <div slot="price">
              <span class="bookPrice">￥{{goodsItem.price}}</span>
            </div>
            <div slot="thumb">
              <img src="../../assets/book.jpg" v-if="goodsItem.imgId == null || goodsItem.imgId == ''">
              <img :src="imgSrc+goodsItem.imgId" v-else>
            </div>
            <div slot="footer">
              <van-button size="mini" @click.native="deleteCart(goodsItem.goodsId)">删除</van-button>
            </div>
          </van-card>
        </div>
        </van-checkbox>
      </van-checkbox-group>
    </van-list>

    <van-submit-bar
      v-if="this.totalPrice==0"
      disabled
      :price=totalPrice
      button-text="提交订单"
      @submit="onSubmit"
    />
    <van-submit-bar
      v-else
      :price=totalPrice
      button-text="提交订单"
      @submit="onSubmit"
    />
    
  </div>
</template>

<script>
import { SubmitBar, Card, Button, Checkbox, CheckboxGroup, List, Icon, Dialog, Toast  } from "vant";
import cart from "@/api/cart";
import order from "@/api/order";
export default {
  name: "cart",
  components: {
   [SubmitBar.name]: SubmitBar,
   [Card.name]: Card,
   [Button.name]: Button,
   [Checkbox.name]: Checkbox,
   [CheckboxGroup.name]: CheckboxGroup,
   [List.name]: List,
   [Icon.name]: Icon,
   [Dialog.name]: Dialog,
   [Toast.name]: Toast
  },
  data() {
    return {
      goodsList:[],
      totalPrice:0,
      resultList: [],
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
      cart.List(this.GLOBAL.user.userId).then(res => {
        this.goodsList = res.cartGoodsList;
      });
      this.totalPrice = 0;
    },
    back() {    
      if(this.GLOBAL.isMine == 1) {
        this.GLOBAL.isMine = 0;
        this.$router.push({ path: "/home/mine" });
        return;
      }
      this.GLOBAL.previousStatus = 0;
      this.$router.push({ path: "/sellingDetails" });
    },
    sellingDetails(goodsItem) {
      if(this.GLOBAL.isDeleteCart == 0){
        this.GLOBAL.isDeleteCart = 1;
        return;
      }
      this.GLOBAL.previousStatus = 1;
      this.GLOBAL.cartGoods = goodsItem;
      this.$router.push({ path: "/sellingDetails" });
    },
    changeResult(resultList) {
      if(this.resultList == null || this.GLOBAL.isDeleteCart == 0 || resultList.length == 0) {
        this.GLOBAL.isDeleteCart = 1;
        this.totalPrice = 0;
      } else {
        cart.Price(resultList).then(res => {
          this.totalPrice = res.totalPrice * 100;
        });
      } 
    },
    deleteCart(goodsId) {
      this.GLOBAL.isDeleteCart = 0;
      Dialog.confirm({
          message: "确定从购物车里删除？",
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        })
          .then(() => {
            let data = {
              goodsId:goodsId,
              userId:this.GLOBAL.user.userId
            }
            cart.DeleteOne(data).then(res => {
              this.init();
              this.totalPrice = 0;
              this.resultList.length = 0;
              return;
            });
          })
          .catch(() => {
            return;
          });
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onSubmit() {
      Dialog.confirm({
          message: "确定购买当前所选？",
          confirmButtonText:"确定购买",
          cancelButtonText:"取消"
        })
          .then(() => {
              let data = {
                goodsIdList:this.resultList,
                buyerId:this.GLOBAL.user.userId
              };
              order.AddList(data).then(res => {
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
.cart {
    .card {
    width: 300px;
    display: inline-block;
  }
}
</style>


