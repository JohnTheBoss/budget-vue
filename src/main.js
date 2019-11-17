// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import Vue App, routes, store
import App from './App';
import routes from './routes';
import "@/assets/css/style.scss"

Vue.use(VueRouter);

// Configure router
const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
});

const DEFAULT_TITLE = 'Budget App';
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

new Vue({
    el: '#app',
    render: h => h(App),
    router
});