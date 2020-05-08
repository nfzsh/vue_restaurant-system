import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
// 以上为没有角色要求的默认路由
// --------------------------
// 后期追加的路由配置
let adminRoutes = [
  {
    props: true,
    path: "/admin/getall",
    component: () => import("@/views/admin/GetAdmins.vue")
  },
  {
    props: true,
    path: "/admin/getuser",
    component: () => import("@/views/admin/GetUser.vue")
  },
  {
    props: true,
    path: "/admin/menu/getmenus/:type",
    component: () => import("@/views/admin/menu.vue")
  },
  {
    props: true,
    path: "/admin/menu/add",
    component: () => import("@/views/admin/addMenu.vue")
  },
  {
    props: true,
    path: "/admin/table",
    component: () => import("@/views/admin/table.vue")
  }
];
const user1Role = "bb63e5f7e0f2ffae845c";
const adminRole = "6983f953b49c88210cb9";
const user2Role = "783f956f147597a7d921";

// 暴露该方法。登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case adminRole:
      router.addRoutes(adminRoutes);
      break;
    case user1Role:
      // 前台的路由
      break;
    case user2Role:
      // 后厨的路由
      break;
  }
}
// 再此文件模块加载时，也执行。用户登陆后刷新页面时，按sessionstorage中数据初始化
// 没有找到sessionstorage的监听事件
updateRoutes();
