
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import Favourites from './views/FavouritesPage';

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Home,
    },
    {
        path: '/favs',
        name: 'FavouritesPage',
        component: Favourites,
    },
];

const router = createRouter({
    history,
    routes,
});

export default router;