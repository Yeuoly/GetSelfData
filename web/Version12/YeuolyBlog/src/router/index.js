import Vue from 'vue';
import VueRouter from 'vue-router';

import AboutPage from '../components/Views/AboutPage';
import SelfMainPage from '../components/Views/SelfMainPage';
import Index from '../components/Views/Index';
import PassportPage from '../components/Views/PassportPage';
import LoginPage from '../components/Items/LoginPage';
import RegisterPage from '../components/Items/RegisterPage';
import EditPage from '../components/Views/EditPage';

import Store from '../store';
import {GlobalCommunication} from "../js/GlobalCommunication";
import SettingPage from "../components/Views/SettingPage";
import BasePrivateSetting from "../components/Items/BasePrivateSetting";
import AdvancePrivateSetting from "../components/Items/AdvancePrivateSetting";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes : [
        {
            name : 'index',
            path : '/',
            component : Index,
            meta : {
                keepAlive : true,
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
                    path : '/passport/login',
                    component : LoginPage,
                    meta : {
                        keepAlive : true,
                        login_required : false
                    }
                },
                {
                    name : 'register',
                    path : '/passport/register',
                    component : RegisterPage,
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
                keepAlive : false,
                login_required : true
            }
        },
        {
            name : 'setting',
            path : '/setting',
            component : SettingPage,
            meta : {
                keepAlive : false,
                login_required : true
            },
            children: [
                {
                    name : 'setting-user-base',
                    path : '/setting/user-base',
                    component : BasePrivateSetting,
                    meta : {
                        login_required : true
                    }
                },
                {
                    name : 'setting-user-advance',
                    path : '/setting/user-advance',
                    component : AdvancePrivateSetting,
                    meta : {
                        login_required : true
                    }
                }
            ]
        }
    ]
});


router.beforeEach((to , from , next) => {
    function f() {
        if(from.name === 'home')
            window.onscroll = null;
        if(!Store.getters.userInfo.online && to.matched.some((item) => {
            return item.meta.login_required === true;
        }))
            next('/passport');
        else
            next();
    }

    if(!Store.getters.userInfo.firstLoad){
        //要等待用户信息加载完成再执行接下来的操作
        GlobalCommunication.$on('firstLoadOver',() => {
            f();
        });
    }else{
        setTimeout(f);
    }
});