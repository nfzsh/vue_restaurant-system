<template>
  <div>
    <el-row>
      <el-col :span="5" v-for="(m, index) in menus" :key="index" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="m.pic" class="image" />
          <div style="padding: 14px;">
            <div align="center" width="20">
              <div text-align="left" display:block>{{ m.name }}</div>
              <span text-align="right" display:block>{{
                `单价：¥${m.price}`
              }}</span>
            </div>
            <div class="bottom clearfix">
              <el-button
                @click.native.prevent="updateMenu(m)"
                align="left"
                style="float:left"
                class="el-icon-edit"
                >详情</el-button
              >
              <el-button
                @click.native.prevent="deleteMenu(m)"
                align="right"
                style="float:right"
                type="danger"
                class="el-icon-delete"
                >删除</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- update dialog -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="menu.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜品名" :label-width="formLabelWidth">
          <el-input v-model="menu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="menu.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜品类别" :label-width="formLabelWidth">
          <el-select v-model="menu.type" placeholder="请选择菜品类别">
            <el-option label="主食/0" value="0"></el-option>
            <el-option label="菜品/1" value="1"></el-option>
            <el-option label="特色菜/2" value="2"></el-option>
            <el-option label="饮料/3" value="3"></el-option>
            <el-option label="酒水/4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input
            v-model="menu.num"
            autocomplete="off"
            placeholder="-1为不限量"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="详细信息"
          type="textarea"
          rows="5"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menu.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="upImg(menu.id)"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

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
import { mapState } from "vuex";
import { GET_MENUS } from "@/store/types.js";
import { DELETE_MENU } from "@/store/types.js";
import { UPDATE_MENU } from "@/store/types.js";
export default {
  props: ["type", "mid"],
  data() {
    return {
      dialogFormVisible: false,
      menu: {
        id: null,
        pic: null,
        price: null,
        name: null,
        type: null,
        num: null,
        message: null
      }
    };
  },
  created() {
    this.$store.dispatch(GET_MENUS, { type: this.type });
  },
  computed: {
    ...mapState(["menus"]),
    headers() {
      return {
        token: sessionStorage.getItem("token"),
        role: sessionStorage.getItem("role")
      };
    }
  },
  methods: {
    updateMenu(m) {
      this.dialogFormVisible = true;
      this.menu = JSON.parse(JSON.stringify(m));
    },
    deleteMenu(m) {
      this.$store.dispatch(DELETE_MENU, { mid: m.id });
    },
    update() {
      this.$store.dispatch(UPDATE_MENU, this.menu);
      this.dialogFormVisible = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        this.$message.error("上传图片大小不能超过 50MB!");
      }
      return isLt50M;
    },
    upImg(id) {
      return `/admin/menu/fileUpload/${id}`;
    }
  }
};
</script>
