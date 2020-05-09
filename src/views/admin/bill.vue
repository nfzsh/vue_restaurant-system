<template>
  <div>
    <el-table
      height="450"
      show-summary
      :summary-method="getSummaries"
      :data="
        bills.filter(
          data =>
            !search ||
            (data.user.name.toLowerCase().includes(search.toLowerCase()) &&
              (!value || isIn(data.payTime)))
        )
      "
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="账单 ID">
              <span>{{ props.row.user.name }}</span>
            </el-form-item>
            <el-form-item label="付款时间">
              <span>{{ props.row.payTime }}</span>
            </el-form-item>
            <el-form-item label="付款金额">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.user.name }}</span>
            </el-form-item>
            <el-form-item label="用户所在城市">
              <span>{{ props.row.user.city }}</span>
            </el-form-item>
            <el-form-item label="用户电话号码">
              <span>{{ props.row.user.phone_num }}</span>
            </el-form-item>
            <el-form-item label="用户生日">
              <span>{{ props.row.user.birth }}</span>
            </el-form-item>
            <el-form-item label="用户评价">
              <span>{{ props.row.note }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="账单 ID" sortable prop="id"> </el-table-column>
      <el-table-column label="用户名" sortable prop="user.name">
      </el-table-column>
      <el-table-column label="账单状态" sortable :formatter="statue">
      </el-table-column>
      <el-table-column label="付款时间" sortable :formatter="date">
      </el-table-column>
      <el-table-column label="联系方式" sortable prop="user.phone_num">
      </el-table-column>
      <el-table-column label="账单数量" sortable prop="p"> </el-table-column>
      <el-table-column label="消费金额" sortable prop="price">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <button v-if="false" @click="scope"></button>
          <el-input v-model="search" size="mini" placeholder="姓名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="get(scope.$index, bills)"
            size="mini"
            class="el-icon-edit"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="lists" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="user.name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="admin.name" label="操作员姓名"> </el-table-column>
      <el-table-column prop="tables.no" label="桌号"> </el-table-column>
      <el-table-column prop="menu.name" label="菜名"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
    </el-table>
  </div>
</template>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<script>
import { mapState } from "vuex";
import { GET_BILLS } from "@/store/types.js";
import { GET_LISTS } from "@/store/types.js";
export default {
  props: ["bid"],
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.$store.dispatch(GET_BILLS);
  },
  computed: {
    ...mapState(["bills"]),
    ...mapState(["lists"])
  },
  methods: {
    statue: function(row, column) {
      if (row.statue == "0") {
        return "未付款";
      } else if (row.statue == "1") {
        return "已付款";
      } else {
        return "未知";
      }
    },
    date: function(row, column) {
      if (row.payTime != null) return row.payTime.replace("T", " ");
      else return "";
    },
    get(index, bills) {
      this.$store.dispatch(GET_LISTS, { bid: bills[index].id });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const n = data.length;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "";
          return;
        }
        if (index === 1) {
          sums[index] = "";
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
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  }
};
</script>
