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
  admins: [],
  users: [],
  menus: [],
  tables: [],
  bills: [],
  lists: [],
  listByStatue: []
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
  },
  [types.GET_ALL_USERS](state, data) {
    state.users = data;
  },
  [types.GET_MENUS](state, data) {
    state.menus = data;
  },
  [types.DELETE_MENU](state, data) {
    state.menus = data;
  },
  [types.UPDATE_MENU](state, data) {
    state.menus = data;
  },
  [types.ADD_MENU](state, data) {
    state.menus = data;
  },
  [types.GET_TABLES](state, data) {
    state.tables = data;
  },
  [types.ADD_TABLE](state, data) {
    state.tables = data;
  },
  [types.DELETE_TABLE](state, data) {
    state.tables = data;
  },
  [types.UPDATE_TABLE](state, data) {
    state.tables = data;
  },
  [types.GET_BILLS](state, data) {
    state.bills = data;
  },
  [types.GET_LISTS](state, data) {
    state.lists = data;
  },
  [types.GET_LISTBYSTATUE](state, data) {
    state.listByStatue = data;
  },
  [types.SET_LISTBYSTATUE](state, data) {
    state.listByStatue = data;
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
  },
  async [types.GET_ALL_USERS]({ commit }, data) {
    let resp = await axios.get("admin/select_users");
    commit(types.GET_ALL_USERS, resp.data.users);
  },
  //获取menu信息
  async [types.GET_MENUS]({ commit }, data) {
    let resp = await axios.get(`admin/menu/get_all/${data.type}`);
    commit(types.GET_MENUS, resp.data.menus);
  },
  //删除menu
  async [types.DELETE_MENU]({ commit }, data) {
    let resp = await axios.get(`admin/menu/delete/${data.mid}`);
    commit(types.DELETE_MENU, resp.data.menus);
  },
  //更新menu
  async [types.UPDATE_MENU]({ commit }, data) {
    let resp = await axios.post("admin/menu/update", data);
    commit(types.UPDATE_MENU, resp.data.menus);
  },
  async [types.ADD_MENU]({ commit }, data) {
    let resp = await axios.post("admin/menu/add", data);
    commit(types.ADD_MENU, resp.data.menus);
  },
  //获取tables表信息
  async [types.GET_TABLES]({ commit }, data) {
    let resp = await axios.get("admin/table/select_all");
    commit(types.GET_TABLES, resp.data.tables);
  },
  async [types.ADD_TABLE]({ commit }, data) {
    let resp = await axios.post("admin/table/add", data);
    commit(types.ADD_TABLE, resp.data.tables);
  },
  async [types.DELETE_TABLE]({ commit }, data) {
    let resp = await axios.get(`admin/table/delete/${data.tid}`);
    commit(types.DELETE_TABLE, resp.data.tables);
  },
  async [types.UPDATE_TABLE]({ commit }, data) {
    let resp = await axios.post(`admin/table/update`, data);
    commit(types.UPDATE_TABLE, resp.data.tables);
  },
  //bills
  async [types.GET_BILLS]({ commit }, data) {
    let resp = await axios.get("admin/bill/getAll");
    commit(types.GET_BILLS, resp.data.bills);
  },
  //lists
  async [types.GET_LISTS]({ commit }, data) {
    let resp = await axios.get(`admin/list/get/${data.bid}`);
    commit(types.GET_LISTS, resp.data.lists);
  },
  //user2
  async [types.GET_LISTBYSTATUE]({ commit }, data) {
    let resp = await axios.get(`user2/getByStatue`);
    commit(types.GET_LISTBYSTATUE, resp.data.lists);
  },
  async [types.SET_LISTBYSTATUE]({ commit }, data) {
    let resp = await axios.get(`user2/setByStatue/${data.lid}/${data.statue}`);
    console.log(data.statue);
    commit(types.SET_LISTBYSTATUE, resp.data.lists);
  }
};
export default new Vuex.Store({
  state: myStates,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});
