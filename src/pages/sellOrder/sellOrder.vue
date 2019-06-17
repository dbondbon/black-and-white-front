<template>
    <div class="sellOrder">
        <van-nav-bar title="收到的订单" left-text="返回" left-arrow @click-left="back"/>
    </div>
</template>

<script>
export default {
    name:"sellOrder",
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


