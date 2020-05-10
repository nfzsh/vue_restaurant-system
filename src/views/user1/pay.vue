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
            >结算</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="账单信息" :visible.sync="dialogFormVisible">
      <el-table show-summary :data="list" stripe :summary-method="getSummaries">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="menu.name" label="菜品名称"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column :formatter="prices" label="价格（总价）">
        </el-table-column>
      </el-table>
      <el-button @click="pay(bill.id)" size="mini" class="el-icon-edit"
        >付款</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import { GET_TABLES } from "@/store/types.js";
import { ADD_BILL } from "@/store/types.js";
import { GET_LIST } from "@/store/types.js";
import { PAY_BILL } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["tid", "bid"],
  data() {
    return {
      dialogFormVisible: false,
      table: {
        id: "",
        no: "",
        num: "",
        statue: "",
        beginTime: "",
        finishTime: ""
      },
      s: Number(0)
    };
  },
  created() {
    this.$store.dispatch(GET_TABLES);
  },
  computed: {
    ...mapState(["tables"]),
    ...mapState(["bill"]),
    ...mapState(["list"])
  },
  methods: {
    update(index, rows) {
      this.dialogFormVisible = true;
      this.$store.dispatch(GET_LIST, { tid: rows[index].id }).then(q => {
        this.$store.dispatch(ADD_BILL, { tid: rows[index].id });
        for (let i = 0; i < this.list.length; i++) {
          this.s =
            this.s + Number(this.list[i].price) * Number(this.list[i].num);
        }
      });
    },
    pay(id) {
      console.log(this.bill.id);
      console.log(id);
      this.$store.dispatch(PAY_BILL, { bid: id });
      this.dialogFormVisible = false;
      this.$store.dispatch(GET_TABLES);
    },
    date: function(row, column) {
      if (row.beginTime != null)
        return row.beginTime.replace("T", " ").substring(0, 19);
      else return "";
    },
    date1: function(row, column) {
      if (row.finishTime != null)
        return row.finishTime.replace("T", " ").substring(0, 19);
      else return "";
    },
    state: function(row, column) {
      if (row.statue == "0") {
        return "未使用";
      } else if (row.statue == "1") {
        return "正在使用";
      } else {
        return "未知";
      }
    },
    prices: function(row, column) {
      return Number(row.price * row.num);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const n = data.length;
      columns.forEach((column, index) => {
        if (index === 3) {
          sums[index] = this.s + "元";
          return;
        }
        if (index === 6) {
          sums[index] = "共计 " + n + " 笔";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 个";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  }
};
</script>
