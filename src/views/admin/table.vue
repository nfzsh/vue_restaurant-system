<template>
  <div>
    <el-table :data="tables" style="width: 100%" stripe fit>
      <el-table-column prop="id" sortable label="#"> </el-table-column>
      <el-table-column prop="no" sortable label="编号"> </el-table-column>
      <el-table-column prop="num" sortable label="座位数"> </el-table-column>
      <el-table-column :formatter="state" sortable label="当前状态">
      </el-table-column>
      <el-table-column :formatter="date" sortable label="开始用餐时间">
      </el-table-column>
      <el-table-column :formatter="date1" sortable label="预计结束时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="update(scope.$index, tables)"
            size="mini"
            class="el-icon-edit"
            >修改</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tables)"
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
      >新建餐桌</el-button
    >

    <el-dialog title="餐桌信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="addtable.no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用餐人数" :label-width="formLabelWidth">
          <el-input v-model="addtable.num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTable(addtable)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- update dialog -->
    <el-dialog title="用户信息" :visible.sync="updatedialogFormVisible">
      <el-form :model="table">
        <el-form-item label="#" :label-width="formLabelWidth">
          <el-input v-model="table.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="桌号" :label-width="formLabelWidth">
          <el-input v-model="table.no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用餐人数" :label-width="formLabelWidth">
          <el-input v-model="table.num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTable(table)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GET_TABLES } from "@/store/types.js";
import { DELETE_TABLE } from "@/store/types.js";
import { UPDATE_TABLE } from "@/store/types.js";
import { ADD_TABLE } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["tid"],
  data() {
    return {
      updatedialogFormVisible: false,
      dialogFormVisible: false,
      table: {
        id: "",
        no: "",
        num: "",
        statue: "",
        beginTime: "",
        finishTime: ""
      },
      addtable: {
        no: "",
        num: ""
      }
    };
  },
  created() {
    this.$store.dispatch(GET_TABLES);
  },
  computed: {
    ...mapState(["tables"])
  },
  methods: {
    date: function(row, column) {
      if (row.beginTime != null) return row.beginTime.replace("T", " ");
      else return "";
    },
    date1: function(row, column) {
      if (row.finishTime != null) return row.finishTime.replace("T", " ");
      else return "";
    },
    deleteRow(index, rows) {
      this.$store.dispatch(DELETE_TABLE, { tid: rows[index].id });
      rows.splice(index, 1);
    },
    update(index, rows) {
      console.log(rows[index].id);
      console.log("rows[index].id");
      this.table.id = rows[index].id;
      this.table.no = rows[index].no;
      this.table.num = rows[index].num;
      this.updatedialogFormVisible = true;
    },
    updateTable(table) {
      this.$store.dispatch(UPDATE_TABLE, table);
      this.updatedialogFormVisible = false;
    },
    add() {
      this.dialogFormVisible = true;
      this.addtable.num = "";
      this.addtable.no = "";
    },
    addTable(table) {
      this.$store.dispatch(ADD_TABLE, table);
      this.dialogFormVisible = false;
    },
    state: function(row, column) {
      if (row.state == "0") {
        return "未使用";
      } else if (row.state == "1") {
        return "正在使用";
      } else {
        return "未知";
      }
    }
  }
};
</script>
