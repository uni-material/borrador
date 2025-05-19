import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";


const routes = [
    { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home' } },
    { path: '/',                        name: 'default',    redirect: '/home'  },
];

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'WHOBA';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;