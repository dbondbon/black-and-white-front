<template>
  <div class="buy">
    <van-search
      placeholder="请输入书名"
      v-model="goods.name"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />

    <!-- 待实现：分页展示数据 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card v-for="goodsItem in goodsList" :key="goodsItem.goodsId" :title="goodsItem.name" :desc="goodsItem.author" :centered="true" @click="sellingDetails(goodsItem)">
      <div slot="price">
        <span class="bookPrice">￥{{goodsItem.price}}</span>
      </div>
      <div slot="thumb">
        <img src="../../assets/book.jpg" v-if="goodsItem.imgId == null || goodsItem.imgId == ''">
        <img :src="imgSrc+goodsItem.imgId" v-else>
      </div>
      </van-card>
    </van-list>

    
  </div>
</template>

<script>
import { Search, Card, Button, List } from "vant";
import goods from "@/api/goods";
export default {
  name: "buy",
  components: {
    [Search.name]: Search,
    [Card.name]: Card,
    [Button.name]: Button,
    [List.name]: List
  },
  data() {
    return {
      goods: {
        name: "",
        userId: ""
      },
      goodsList: [],
      loading: false,
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
      this.goods.userId = this.GLOBAL.user.userId;
      goods.FindGoods(this.goods).then(res => {
        this.goodsList = res.list;
      });
    },
    onLoad() {
      console.log("加载更多");
    },
    onSearch() {
      goods.FindGoods(this.goods).then(res => {
        this.goodsList = res.list;
      });
    },
    onCancel() {
      console.log("取消");
    },
    sellingDetails(goodsItem) {
      this.GLOBAL.goods = goodsItem;
      this.GLOBAL.previousStatus = 0;
      this.$router.push({ path: "/sellingDetails" });
    }
  }
};
</script>

<style lang="less" scoped>
.buy {
  
}
</style>


