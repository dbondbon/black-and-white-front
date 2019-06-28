<template>
  <div class="onSale">
    <van-nav-bar title="我的待售" left-text="返回" left-arrow @click-left="back"/>
    <van-list :finished="finished" v-if="goodsList.length!=0">
      <van-card
        :title="goodsItem.name"
        :desc="goodsItem.author"
        :centered="true"
        v-for="goodsItem in goodsList"
        :key="goodsItem.goodsId"
      >
        <div slot="price">
          <span class="bookPrice">￥{{goodsItem.price}}</span>
        </div>
        <div slot="thumb">
          <img src="../../assets/book.jpg" v-if="goodsItem.imgId == null || goodsItem.imgId == ''">
          <img :src="imgSrc+goodsItem.imgId" v-else>
        </div>
        <div slot="footer">
          <van-button size="mini" @click.native="deleteGoods(goodsItem.goodsId)">删除</van-button>
        </div>
      </van-card>
    </van-list>
    <!-- <span v-else>
      暂无待售
    </span>-->
  </div>
</template>

<script>
import user from "@/api/user";
import goods from "@/api/goods";
import { List, Card, Button, Toast, Dialog } from "vant";
export default {
  name: "onSale",
  components: {
    [List.name]: List,
    [Card.name]: Card,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      goodsList: [],
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
      goods.OnSaleList(this.GLOBAL.user.userId).then(res => {
        if (res.goodsList == null) {
          this.goodsList.length = 0;
        } else {
          this.goodsList = res.goodsList;
        }
      });
    },
    back() {
      this.$router.push({ path: "/home/mine" });
    },
    deleteGoods(goodsId) {
      Dialog.confirm({
          message: "确定删除待售书籍？",
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        })
          .then(() => {
            goods.DeleteGoods(goodsId).then(res => {
              this.init();
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


