import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainView",
    component: () =>
      import(/* webpackChunkName: "MainView" */ "../views/MainView.vue"),
  },
  {
    path: "/qrscan",
    name: "QRScan",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "QRScan" */ "../views/QRScan.vue"),
  },
  {
    path: "/account",
    name: "MyAccount",
    component: () =>
      import(/* webpackChunkName: "MyAccount" */ "../views/MyAccount.vue"),
  },
  {
    path: "/licenses",
    name: "Licenses",
    component: () =>
      import(/* webpackChunkName: "Licenses" */ "../views/Licenses.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
