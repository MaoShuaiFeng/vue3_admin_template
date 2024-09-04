<template>
  <div>
    <el-card >
      <div class="box">
        <img :src="userStore.avatar" alt="用户头像"></img>
        <div>
          <p>
            {{ userStore.username }}
          </p>
          <span>后台管理系统</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;
  img{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin-right: 20px;
  }
  div{
 p{
  font-size: 40px;
  font-weight: 700;
  margin: 30px
 }
 span{
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  color: rgb(175, 175, 175);
  font-style: italic;
 }
  }
}
</style>
