<template>
  <div>
    <div id="left" style="float:left ; width:50%; height:100%;">
      <el-table
        :data="listByStatue.filter(data => data.statue == 0)"
        stripe
        fit
      >
        <el-table-column prop="id" label="#"> </el-table-column>
        <el-table-column prop="menu.name" label="菜名"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column :formatter="date" label="点菜时间"> </el-table-column>
        <el-table-column label="状态"> 等待制作</el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="
                update1(
                  scope.$index,
                  listByStatue.filter(data => data.statue == 0)
                )
              "
              size="mini"
              class="el-icon-edit"
              >正在制作</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="right" style="float:left ; width:50%; height:100%;">
      <el-table
        :data="listByStatue.filter(data => data.statue == 1)"
        stripe
        fit
      >
        <el-table-column prop="id" label="#"> </el-table-column>
        <el-table-column prop="menu.name" label="菜名"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column :formatter="date" label="点菜时间"> </el-table-column>
        <el-table-column label="状态"> 正在制作</el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="
                update2(
                  scope.$index,
                  listByStatue.filter(data => data.statue == 1)
                )
              "
              size="mini"
              class="el-icon-edit"
              >制作完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { GET_LISTBYSTATUE } from "@/store/types.js";
import { SET_LISTBYSTATUE } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["lid", "statue"],
  created() {
    this.$store.dispatch(GET_LISTBYSTATUE);
  },
  computed: {
    ...mapState(["listByStatue"])
  },
  methods: {
    update1(index, rows) {
      this.$store.dispatch(SET_LISTBYSTATUE, {
        lid: rows[index].id,
        statue: "1"
      });
      console.log("1");
    },
    update2(index, rows) {
      this.$store.dispatch(SET_LISTBYSTATUE, {
        lid: rows[index].id,
        statue: "2"
      });
    },
    date: function(row, column) {
      if (row.addTime != null) return row.addTime.replace("T", " ");
      else return "";
    }
  }
};
</script>
