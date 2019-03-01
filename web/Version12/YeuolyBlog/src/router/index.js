import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../components/AboutPage';
import SelfMainPage from  '../components/SelfMainPage';
import Index from '../components/Index';
import LoginPage from '../components/LoginPage';

import { FunctionGroup } from "../js/GlobalUtils";

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
                login_required : true
            }
        },
        {
            name : 'login',
            path : '/login',
            component : LoginPage,
            meta : {
                login_required : false
            }
        }
    ]
});


router.beforeEach((to , from , next) => {
    if(!FunctionGroup.isOnline() && to.matched.some((item) => {
        return item.meta.login_required === true;
    }))
        next('login');
    else
        next();
});