<template>
    <div class="buyOrderDetails">
        <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="back"/>
        订单详情
    </div>
</template>

<script>
export default {
    name: "buyOrderDetails",
    data() {
        return {

        };
    },
    mounted() {
        console.log(this.$route.query.order);
    },
    methods: {
        back() {
            this.$router.push({ path: "/buyOrder" });
        }
    }
}
</script>



