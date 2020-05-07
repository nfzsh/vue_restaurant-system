<template>
  <div>
    <el-table :data="admins" style="width: 100%" stripe fit>
      <el-table-column fixed prop="id" sortable label="编号"> </el-table-column>
      <el-table-column prop="name" sortable label="姓名"> </el-table-column>
      <el-table-column :formatter="auth" sortable label="权限">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="update(scope.$index, admins)"
            size="mini"
            class="el-icon-edit"
            >修改</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, admins)"
            type="danger"
            size="mini"
            class="el-icon-delete"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button
      type="text"
      @click="add()"
      style="width: 100%"
      class="el-icon-circle-plus-outline"
      >新建用户</el-button
    >

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addadmin.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="addadmin.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限信息" :label-width="formLabelWidth">
          <el-select v-model="addadmin.authority" placeholder="请选择权限范围">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="前台" value="1"></el-option>
            <el-option label="后厨" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin(addadmin)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- update dialog -->
    <el-dialog title="用户信息" :visible.sync="updatedialogFormVisible">
      <el-form :model="admin">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="admin.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="admin.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            placeholder="留空则默认不修改密码"
            v-model="admin.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限信息" :label-width="formLabelWidth">
          <el-select v-model="admin.authority" placeholder="请选择权限范围">
            <el-option label="管理员/0" value="0"></el-option>
            <el-option label="前台/1" value="1"></el-option>
            <el-option label="后厨/2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAdmin(admin)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GET_ALL_ADMINS } from "@/store/types.js";
import { DEL_ADMIN } from "@/store/types.js";
import { ADD_ADMIN } from "@/store/types.js";
import { UPDATE_ADMIN } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["aid"],
  data() {
    return {
      updatedialogFormVisible: false,
      dialogFormVisible: false,
      admin: {
        id: "",
        name: "",
        password: "",
        authority: ""
      },
      addadmin: {
        name: "",
        password: "",
        authority: ""
      }
    };
  },
  created() {
    this.$store.dispatch(GET_ALL_ADMINS);
  },
  computed: {
    ...mapState(["admins"])
  },
  methods: {
    deleteRow(index, rows) {
      this.$store.dispatch(DEL_ADMIN, { aid: rows[index].id });
      rows.splice(index, 1);
    },
    update(index, rows) {
      this.admin.id = rows[index].id;
      this.admin.name = rows[index].name;
      this.admin.authority = rows[index].authority;
      this.updatedialogFormVisible = true;
    },
    updateAdmin(admin) {
      console.log(admin);
      this.$store.dispatch(UPDATE_ADMIN, admin);
      this.updatedialogFormVisible = false;
    },
    add() {
      this.dialogFormVisible = true;
      this.addadmin.id = "";
      this.addadmin.password = "";
      this.addadmin.name = "";
      this.addadmin.authority = "";
    },
    addAdmin(admin) {
      this.$store.dispatch(ADD_ADMIN, admin);
      this.dialogFormVisible = false;
    },
    auth: function(row, column) {
      if (row.authority == "0") {
        return "管理员";
      } else if (row.authority == "1") {
        return "前台";
      } else {
        return "后厨";
      }
    }
  }
};
</script>
