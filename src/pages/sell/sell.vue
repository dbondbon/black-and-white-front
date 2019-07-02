<template>
  <div class="sell">
    <van-nav-bar title="卖书" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <div class="uploadWrapper">
        <van-uploader :after-read="uploadImg">
          <van-icon name="add-o" size="20px"/>
        </van-uploader>
    </div>

    <van-cell-group class="headInput">
      <van-field clearable label="点击上传封面" />
      <van-field v-model="goods.name" clearable label="书名" placeholder="请输入书名"/>
      <van-field v-model="goods.author" clearable label="作者" placeholder="请输入作者"/>
      <van-field v-model="goods.publisher" clearable label="出版社" placeholder="请输入出版社"/>
      <van-field v-model="goods.price" clearable label="出售价" placeholder="请输入出售价"/>
      <van-field
        v-model="goods.description"
        label="描述信息"
        type="textarea"
        placeholder="请输入描述信息"
        rows="3"
      />
    </van-cell-group>

    <div class="submit">
      <van-button type="primary" v-if="submitFlag==0" round size="large" @click="submit">发布</van-button>
      <van-button type="primary" v-else round disabled size="large">发布</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field, Toast, Uploader, Dialog, Icon } from "vant";
import goods from "@/api/goods";
import common from "@/api/common";
export default {
  name: "sell",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data() {
    return {
      submitFlag: 0,
      goods: {
        name: "",
        price: null,
        description: "",
        publisher: "",
        author: "",
        userId: "",
        imgId:""
      },
      imgFile:null
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/home" });
    },
    uploadImg(file) {
      this.imgFile = new FormData(); 
      this.imgFile.append('file',file.file); 
      // 上传图片到服务器，返回图片id
      common.UploadImg(this.imgFile).then(res => {
        if (res.code == 1) {
          Toast.fail(res.msg);
        } else {
          this.goods.imgId = res.imgId;
          Toast('上传成功，如需重新上传请直接点击');
        }
      });
    },
    submit() {
      if (this.goods.name == null || this.goods.name == "") {
        Toast.fail("书名不能为空");
        return;
      }
      if (this.goods.name.length > 40) {
        Toast.fail("书名过长");
        return;
      }
      if (this.goods.author == null || this.goods.author == "") {
        Toast.fail("作者名不能为空");
        return;
      }
      if (this.goods.author.length > 40) {
        Toast.fail("作者名过长");
        return;
      }
      if (this.goods.publisher == null || this.goods.publisher == "") {
        Toast.fail("出版社不能为空");
        return;
      }
      if (this.goods.publisher.length > 20) {
        Toast.fail("出版社名过长");
        return;
      }
      if (this.goods.price == null || this.goods.price == "") {
        Toast.fail("出售价不能为空");
        return;
      }
      if (this.goods.price < 0) {
        Toast.fail("出售价必须为正数");
        return;
      }
      if (this.goods.description == null || this.goods.description == "") {
        Toast.fail("描述信息不能为空");
        return;
      }
      if (this.goods.description.length > 200) {
        Toast.fail("描述信息过长");
        return;
      }
      Toast.loading({
        mask: true,
        duration: 0,
        message: "正在发布..."
      });
      this.goods.userId = this.GLOBAL.user.userId;
      this.submitFlag = 1;
      goods.Published(this.goods).then(res => {
        
        Toast.clear();
        Dialog.confirm({
          title: "发布成功",
          message: "是否继续发布",
          confirmButtonText: "是",
          cancelButtonText: "否"
        })
          .then(() => {
            this.submitFlag = 0;
            this.goods.name = "";
            this.goods.price = "";
            this.goods.description = "";
            this.goods.publisher = "";
            this.goods.author = "";
          })
          .catch(() => {
            this.$router.push({ path: "/home" });
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sell {
  .headInput {
    text-align: center;
  }
  .uploadWrapper {
    position: absolute;
    top: 60px;
    left: 150px;
    z-index: 10;
  }
}
</style>


