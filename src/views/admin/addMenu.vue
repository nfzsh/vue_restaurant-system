<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="菜品名称" :label-width="formLabelWidth">
        <el-input v-model="menu.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="menu.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜品类别" :label-width="formLabelWidth">
        <el-select v-model="menu.type" placeholder="请选择菜品类别">
          <el-option label="主食" value="0"></el-option>
          <el-option label="菜品" value="1"></el-option>
          <el-option label="特色菜" value="2"></el-option>
          <el-option label="饮料" value="3"></el-option>
          <el-option label="酒水" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input
          v-model="menu.num"
          autocomplete="off"
          placeholder="-1为不限量"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细信息" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="5"
          v-model="menu.message"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">{{ a }}</el-button>
  </el-dialog>
</template>
<style>
.clearfix:after {
  clear: both;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import { ADD_MENU } from "@/store/types.js";
export default {
  data() {
    return {
      dialogFormVisible: true,
      a: "确 定",
      menu: {
        price: null,
        name: null,
        type: null,
        num: null,
        message: null
      },
      addmenu: {
        price: null,
        name: null,
        type: null,
        num: null,
        message: null
      }
    };
  },
  methods: {
    add() {
      this.addmenu = JSON.parse(JSON.stringify(this.menu));
      this.menu.price = null;
      this.menu.name = null;
      this.menu.type = null;
      this.menu.num = null;
      this.menu.message = null;
      this.$store.dispatch(ADD_MENU, this.addmenu);
      this.a = "继续添加";
    }
  }
};
</script>
