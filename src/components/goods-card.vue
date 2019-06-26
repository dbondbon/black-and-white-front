<template>
    <van-card :title="goods.name" :desc="goods.author" :centered="true" @click="sellingDetails(goodsItem)">
      <div slot="price">
        <span class="bookPrice">￥{{goods.price}}</span>
      </div>
      <div slot="thumb">
        <img src="../../assets/book.jpg">
      </div>
</template>

<script>
import { Card } from "vant";
import common from "@/api/common";
export default {
    name:"goods-card",
    components: {
        [Card.name]: Card,
    },
    data() {
        return {
            goods:{},
        }
    },
    props: {
        data:Object
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.data = goods;
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>


