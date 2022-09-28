import Vue from "vue";
import VueRouter from "vue-router";
import AllTasks from "@/views/AllTasks";
import CreateTask from "@/views/CreateTask";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: AllTasks,
    },
    {
        path: "/create",
        name: "create",
        component: CreateTask,
    },
];

const router = new VueRouter({
    routes,
});

export default router;