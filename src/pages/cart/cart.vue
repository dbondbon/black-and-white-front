<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="back"/>

    <van-list :finished="finished">
      <van-checkbox-group v-model="result" :change="changeResult(result)">
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
              <img src="../../assets/book.jpg">
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
import { SubmitBar, Card, Button, Checkbox, CheckboxGroup, List, Icon, Dialog  } from "vant";
import cart from "@/api/cart";
import goods from "@/api/goods";
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
   [Dialog.name]: Dialog
  },
  data() {
    return {
      goodsList:[],
      totalPrice:0,
      result: [],
      finished: true,
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
      goods.FindCartGoods(data).then(res => {
        this.goodsList = res.list;
      });
    },
    back() {    
      this.GLOBAL.previousStatus = 0;
      this.$router.push({ path: "/sellingDetails" });
    },
    sellingDetails(goodsItem) {
      if(this.GLOBAL.isDeleteCart == 0){
        this.GLOBAL.isDeleteCart = 1;
        let i = this.result.indexOf(goodsItem.goodsId)
        this.result.splice(i,1)
        console.log(this.result);
        return;
      }
      this.GLOBAL.previousStatus = 1;
      this.GLOBAL.cartGoods = goodsItem;
      this.$router.push({ path: "/sellingDetails" });
    },
    changeResult(result) {
      if(result.length == 0) {
        this.totalPrice = 0;
        return;
      }
      let data = {
        goodsIdList:result,
      }
      cart.Price(data).then(res => {
        this.totalPrice = res.totalPrice * 100;
      });
    },
    deleteCart(goodsId) {
      this.GLOBAL.isDeleteCart = 0;
      Dialog.confirm({
          message: "确定从购物车里删除？",
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        })
          .then(() => {
            cart.Delete({goodsId:goodsId,userId:this.GLOBAL.user.userId}).then(res => {
              this.init();
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
      console.log("提交订单")
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


