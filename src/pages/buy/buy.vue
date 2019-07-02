<template>
  <div class="buy">
    <van-search
      placeholder="请输入书名"
      v-model="goods.name"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />

    <van-list v-model="loading" 
      :finished="finished" 
      finished-text="没有更多了" 
      @load="onLoad"
      :immediate-check=false
      offset=0
    >
      <van-card
        v-for="goodsItem in goodsList"
        :key="goodsItem.goodsId"
        :title="goodsItem.name"
        :desc="goodsItem.author"
        :centered="true"
        @click="sellingDetails(goodsItem)"
      >
        <div slot="price">
          <span class="bookPrice">￥{{goodsItem.price}}</span>
        </div>
        <div slot="thumb">
          <img src="../../assets/book.jpg" v-if="goodsItem.imgId == null || goodsItem.imgId == ''" />
          <img :src="imgSrc+goodsItem.imgId" v-else />
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { Search, Card, Button, List, Toast } from "vant";
import goods from "@/api/goods";
export default {
  name: "buy",
  components: {
    [Search.name]: Search,
    [Card.name]: Card,
    [Button.name]: Button,
    [List.name]: List,
    [Toast.name]: Toast
  },
  data() {
    return {
      goods: {
        name: "",
        userId: "",
        pageSize: 10,
        pageNum: 1
      },
      goodsList: [],
      loading: false,
      finished: false,
      imgSrc: ""
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
        this.goodsList = res.pageInfo.list;
      });
    },
    onLoad() {
      this.goods.pageNum = this.goods.pageNum + 1;
      goods.FindGoods(this.goods).then(res => {
        this.goodsList = this.goodsList.concat(res.pageInfo.list);
        this.loading = false;
        if (res.pageInfo.isLastPage == true) {
          this.finished = true;
          Toast('已经到底了');
        }
      });
    },
    onSearch() {
      goods.FindGoods(this.goods).then(res => {
        this.goodsList = res.pageInfo.list;
      });
    },
    onCancel() {
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


