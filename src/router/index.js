import Vue from "vue";
import VueRouter from "vue-router";
import AllTasks from "@/views/AllTasks";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: AllTasks,
}, ];

const router = new VueRouter({
    routes,
});

export default router;