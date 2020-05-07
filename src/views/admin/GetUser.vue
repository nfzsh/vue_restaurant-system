<template>
  <el-table :data="users" style="width: 100%" stripe fit>
    <el-table-column prop="id" label="#" align="center" width="50">
    </el-table-column>
    <el-table-column label="用户信息">
      <el-table-column prop="avatarUrl" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" width="100" height="80" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column :formatter="date" label="注册时间" align="center">
      </el-table-column>
      <el-table-column prop="birth" label="生日" align="center">
      </el-table-column>
      <el-table-column prop="phone_num" label="电话号码" align="center">
      </el-table-column>
      <el-table-column label="地址">
        <el-table-column prop="country" label="国家" align="center">
        </el-table-column>
        <el-table-column prop="province" label="省份" align="center">
        </el-table-column>
        <el-table-column prop="city" label="市区" align="center">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
import { GET_ALL_USERS } from "@/store/types.js";
export default {
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.$store.dispatch(GET_ALL_USERS);
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    date: function(row, column) {
      return row.insertTime.replace("T", " ");
    }
  }
};
</script>
