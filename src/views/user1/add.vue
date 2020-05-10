<template>
  <div>
    <el-table
      :data="tables.filter(data => data.num == num && data.statue == '0')"
      style="width: 100%"
      stripe
      fit
    >
      <el-table-column prop="id" sortable label="#"> </el-table-column>
      <el-table-column prop="no" sortable label="编号"> </el-table-column>
      <el-table-column prop="num" sortable label="座位数"> </el-table-column>
      <el-table-column :formatter="state" sortable label="当前状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="
              update(
                scope.$index,
                tables.filter(data => data.num == num && data.statue == '0')
              )
            "
            size="mini"
            class="el-icon-edit"
            >开台</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GET_TABLEBYNUM } from "@/store/types.js";
import { GET_TABLESTATUE } from "@/store/types.js";
import { KT } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["num"],
  data() {
    return {};
  },
  created() {
    this.$store.dispatch(GET_TABLEBYNUM, { num: this.num });
  },
  computed: {
    ...mapState(["tables"])
  },
  methods: {
    update(index, data) {
      this.$store.dispatch(KT, { tid: data[index].id });
      this.$store.dispatch(GET_TABLESTATUE);
    },
    state: function(row, column) {
      if (row.statue == "0") {
        return "未使用";
      } else if (row.statue == "1") {
        return "正在使用";
      } else {
        return "未知";
      }
    }
  }
};
</script>
