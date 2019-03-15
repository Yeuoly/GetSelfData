import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../components/Views/AboutPage';
import SelfMainPage from '../components/Views/SelfMainPage';
import Index from '../components/Views/Index';
import PassportPage from '../components/Views/PassportPage';
import LoginPage from '../components/Items/LoginPage';
import EditPage from '../components/Views/EditPage';

import Store from '../store';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes : [
        {
            name : 'index',
            path : '',
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
            name : 'passport',
            path : '/passport',
            component : PassportPage,
            meta : {
                keepAlive : true,
                login_required : false
            },
            children: [
                {
                    name : 'login',
                    path : 'login',
                    component : LoginPage,
                    meta : {
                        keepAlive : true,
                        login_required : false
                    }
                }
            ]
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