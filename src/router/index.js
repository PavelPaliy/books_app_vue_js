import { createWebHistory, createRouter } from "vue-router";
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Home = { template: '<div>home</div>' };

const routes = [
    {
        path: "/",
        component: Home,
    },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;


