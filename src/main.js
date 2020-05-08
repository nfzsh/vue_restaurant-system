import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import jQuery from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  jQuery,
  render: h => h(App)
}).$mount("#app");
