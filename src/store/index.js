import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import { updateRoutes } from "@/router/index";
import axios from "@/axios/MyAxios";

Vue.use(Vuex);

const myStates = {
  exception: { message: null },
  isLogin: false,
  admin: {
    name: null,
    password: null,
    authority: null
  },
  admins: []
};
const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.GET_ADMIN](state, data) {
    state.admin = data;
  },
  [types.GET_ALL_ADMINS](state, data) {
    state.admins = data;
  },
  [types.DEL_ADMIN](state, data) {
    state.admins = data;
  },
  [types.ADD_ADMIN](state, data) {
    state.admins = data;
  },
  [types.UPDATE_ADMIN](state, data) {
    state.admins = data;
  }
};

const myActions = {
  // 登录
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("admin/login", data);
    let token = resp.headers["token"];
    let role = resp.headers["role"];
    if (token != null) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      updateRoutes();
      commit(types.LOGIN, true);
    }
  },
  //获取admin信息
  async [types.GET_ADMIN]({ commit }, data) {
    let resp = await axios.get(`admin/select/${data.name}`);
    commit(types.GET_ADMIN, resp.data.admin);
  },
  async [types.GET_ALL_ADMINS]({ commit }, data) {
    let resp = await axios.get("admin/select_all");
    commit(types.GET_ALL_ADMINS, resp.data.admins);
  },
  async [types.DEL_ADMIN]({ commit }, data) {
    let resp = await axios.get(`admin/delete/${data.aid}`);
    commit(types.DEL_ADMIN, resp.data.admins);
  },
  async [types.ADD_ADMIN]({ commit }, data) {
    let resp = await axios.post("admin/add", data);
    commit(types.ADD_ADMIN, resp.data.admins);
  },
  async [types.UPDATE_ADMIN]({ commit }, data) {
    let resp = await axios.post("admin/update", data);
    commit(types.UPDATE_ADMIN, resp.data.admins);
  }
};
export default new Vuex.Store({
  state: myStates,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});
