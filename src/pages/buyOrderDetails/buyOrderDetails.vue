<template>
    <div class="buyOrderDetails">
        <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="back"/>
        <van-cell-group>
            <van-cell title="订单编号" v-model="code"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: "buyOrderDetails",
    data() {
        return {
            order:{},
            code:''
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.order = this.$route.query.goods;
            this.code = this.$route.query.code;
        },
        back() {
            this.$router.push({ path: "/buyOrder" });
        }
    }
}
</script>



