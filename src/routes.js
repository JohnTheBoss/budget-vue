import Home from '@/pages/Home';
import PageNotFound from "@/pages/PageNotFound";
// const AppNAME = () => import('@/components/AppNAME');


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    { 
        path: '*', 
        name: 'PageNotFound',
        component: PageNotFound
    }
];

export default routes;