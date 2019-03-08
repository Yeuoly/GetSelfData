import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../components/AboutPage';
import SelfMainPage from  '../components/SelfMainPage';
import Index from '../components/Index';
import LoginPage from '../components/LoginPage';
import EditPage from '../components/EditPage';

import Store from '../store';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes : [
        {
            name : 'index',
            path : '/',
            component : Index,
            meta : {
                login_required : false
            }
        },
        {
            name : 'about',
            path : '/about',
            component : AboutPage,
            meta : {
                login_required : false
            }
        },
        {
            name : 'home',
            path : '/home',
            component : SelfMainPage,
            meta : {
                keepAlive : true,
                login_required : true
            }
        },
        {
            name : 'login',
            path : '/login',
            component : LoginPage,
            meta : {
                keepAlive : true,
                login_required : false
            }
        },
        {
            name : 'edit',
            path : '/edit',
            component : EditPage,
            meta : {
                keepAlive : true,
                login_required : true
            }
        }
    ]
});


router.beforeEach((to , from , next) => {
    if(from.name === 'home')
        window.onscroll = null;
    if(Store.getters.userInfo.online && to.matched.some((item) => {
        return item.meta.login_required === true;
    }))
        next('login');
    else
        next();
});