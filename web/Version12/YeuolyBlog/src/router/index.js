import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '../components/AboutPage';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes : [
        {
            path : '/About',
            component : AboutPage
        }
    ]
});