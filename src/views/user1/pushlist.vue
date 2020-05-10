<template>
  <el-container>
    <el-aside style="text-align:center; border:10px">
      <el-select
        v-model="num"
        placeholder="选择查看队列人数"
        @change="clickone"
      >
        <el-option
          v-for="item in tableStatueAll"
          :key="item.num"
          :label="item.num"
          :value="item.num"
        >
        </el-option>
      </el-select>
      <br />
      <el-button
        @click.native.prevent="addOne()"
        size="mini"
        class="el-icon-edit"
        >取号</el-button
      >
      <el-button
        @click.native.prevent="deleteFirst()"
        type="danger"
        size="mini"
        class="el-icon-delete"
      >
        叫号
      </el-button>
      <el-table :data="queue" style="width: 100%" stripe fit height="500">
        <el-table-column prop="uid" label="用户ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="num" label="排队编号" width="100" align="center">
        </el-table-column>
      </el-table>
    </el-aside>
    <el-aside>
      <el-table :data="tableStatue" style="width: 100%" stripe fit>
        <el-table-column prop="num" label="座位数量" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="count"
          label="剩余数量"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="add(scope.$index, tableStatue)"
              size="mini"
              class="el-icon-edit"
              :disabled="btn(scope.$index, tableStatue)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-aside>
    <el-container>
      <el-main> <router-view /></el-main>
    </el-container>
  </el-container>
</template>

<style></style>
<script>
import { mapState } from "vuex";
import { GET_TABLESTATUE } from "@/store/types.js";
import { GET_TABLEBYNUM } from "@/store/types.js";
import { GET_TABLENUM } from "@/store/types.js";
import { GET_QUEUE } from "@/store/types.js";
import { ADD_QUEUE } from "@/store/types.js";
import { DELETE_FIRST_QUEUE } from "@/store/types.js";
export default {
  props: ["num", "tn"],
  data() {
    return {
      key: null
    };
  },
  created() {
    this.$store.dispatch(GET_TABLESTATUE);
    this.$store.dispatch(GET_TABLENUM);
  },
  computed: {
    ...mapState(["tableStatue"]),
    ...mapState(["tableStatueAll"]),
    ...mapState(["queue"]),
    ...mapState(["number"])
  },
  methods: {
    btn(index, data) {
      if (data[index].num == "0") return true;
      else return false;
    },
    add(index, data) {
      this.$router.push(`/user1/queue/add/${data[index].num}`);
    },
    clickone(event, item) {
      this.$store.dispatch(GET_QUEUE, { tn: event });
      this.key = event;
    },
    addOne() {
      this.$store
        .dispatch(ADD_QUEUE, { tn: this.key, uid: "admin" })
        .then(q => {
          this.$alert(`您号码为${this.number}`, "取号成功！", {
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "开始打印",
                message: `打印号码为 ${this.number}`
              });
            }
          });
          this.$store.dispatch(GET_QUEUE, { tn: this.key });
        });
    },
    deleteFirst() {
      let content = "请" + this.queue[0].num + "号准备用餐";
      let utterThis = new window.SpeechSynthesisUtterance();
      utterThis.text = content;
      window.speechSynthesis.speak(utterThis);
      window.speechSynthesis.speak(utterThis);
      window.speechSynthesis.speak(utterThis);
      this.$store
        .dispatch(DELETE_FIRST_QUEUE, { tn: this.key, uid: "admin" })
        .then(q => {
          this.$alert(`号码为${this.queue[0].num}`, "叫号成功！", {
            confirmButtonText: "确定"
          });
          this.$store.dispatch(GET_QUEUE, { tn: this.key });
        });
    }
  }
};
</script>
