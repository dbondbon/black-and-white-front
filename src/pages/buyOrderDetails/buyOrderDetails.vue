<template>
    <div class="buyOrderDetails">
        <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="back"/>
        <van-cell-group>
            <van-cell title="订单编号" v-model="code"></van-cell>
            <van-cell title="书名" v-model="goods.name"></van-cell>
            <van-cell title="作者" v-model="goods.author"></van-cell>
            <van-cell title="出版社" v-model="goods.publisher"></van-cell>
            <van-cell title="购买价格" v-model="goods.price"></van-cell>
            <van-cell title="下单时间" v-model="goods.createTime"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: "buyOrderDetails",
    data() {
        return {
            goods:{},
            code:''
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.goods = this.$route.query.goods;
            this.code = this.$route.query.code;
        },
        back() {
            this.$router.push({ path: "/buyOrder" });
        }
    }
}
</script>



