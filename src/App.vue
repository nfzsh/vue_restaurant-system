<template>
  <div id="app">
    <sidebar />
    <router-link>home</router-link>
    <router-view id="router" :key="$route.path" />
    <alertdialog />
    <login />
  </div>
</template>

<script>
import sidebar from "@/views/Sidebar";
export default {
  components: {
    sidebar,
    alertdialog: () => import("@/components/AlertDialog.vue"),
    login: () => import("@/views/login/login.vue")
  }
};
</script>

<style>
#router {
  flex: 1;
}
</style>
