<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/admin/getall">账号管理</el-menu-item>
      <el-menu-item index="/admin/getuser">用户查看</el-menu-item>
      <el-submenu>
        <template slot="title">菜单管理</template>
        <el-menu-item index="/admin/menu/getmenus/0">主食</el-menu-item>
        <el-menu-item index="/admin/menu/getmenus/1">菜品</el-menu-item>
        <el-menu-item index="/admin/menu/getmenus/2">特色菜</el-menu-item>
        <el-menu-item index="/admin/menu/getmenus/3">饮料</el-menu-item>
        <el-menu-item index="/admin/menu/getmenus/4">酒水</el-menu-item>
        <el-menu-item index="/admin/menu/add">添加...</el-menu-item>
      </el-submenu>
      <el-menu-item index="/admin/table">餐桌管理</el-menu-item>
      <el-menu-item index="3">订单查看</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
