import Home from '@/pages/Home';
// const AppNAME = () => import('@/components/AppNAME');


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home | Budget App' }
    }
];

export default routes;