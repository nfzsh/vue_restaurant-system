<template>
  <div>
    <el-dialog
      width="30%"
      title="登录"
      :visible.sync="modelShow"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" size="small" label-width="100px">
        <el-row>
          <el-form-item label="用户名：">
            <el-input class="search-input" v-model="name" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" class="search-input" v-model="password" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="button" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { LOGIN } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  data: () => ({
    //是否显示本面板
    modelShow: false,
    //是否可以关闭
    canClose: false,
    name: null,
    password: null
  }),
  watch: {
    t() {
      return !this.isLogin;
    }
  },
  mounted: function() {
    const that = this;
    //如果用户没有登录，则打开登录界面
    if (window.sessionStorage) {
      const token = sessionStorage.getItem("token");
      if (token) {
        that.modelShow = false;
      } else {
        that.modelShow = true;
      }
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    async login() {
      this.$store.dispatch(LOGIN, {
        name: this.name,
        password: this.password
      });
      this.password = null;
      this.name = null;
      this.modelShow = false;
    },
    //关闭登录窗口前的回调(如果用户没有登录成功，则再次打开本窗口，以达到强制登录的目的)
    closeCallback: function() {
      if (sessionStorage) {
        const data = sessionStorage.getItem("token");
        if (data) {
          this.modelShow = false;
        } else {
          this.modelShow = true;
        }
      }
      this.a();
    }
  }
};
</script>
<style scoped></style>
