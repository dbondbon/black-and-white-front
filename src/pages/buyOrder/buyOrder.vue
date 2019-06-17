<template>
    <div class="buyOrder">
        <van-nav-bar title="我下的订单" left-text="返回" left-arrow @click-left="back"/>
    </div>
</template>

<script>
export default {
    name:"buyOrder",
    data() {
        return {

        }
    },
    methods: {
        back() {
            this.$router.push({ path: "/home/mine" });
        }
    }
}
</script>

<style lang="less" scoped>

</style>


