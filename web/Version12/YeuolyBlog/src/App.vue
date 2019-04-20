<template>
    <div id="app">
        <ConstDom/>
        <MessageBox />
        <transition :name="transition">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view class="transition-body"></router-view>
            </keep-alive>
            <router-view v-else class="transition-body"></router-view>
        </transition>
    </div>
</template>

<script>
    import ConstDom from './components/Items/ConstDom';
    import ConstFooter from './components/Items/ConstFooter';
    import MessageBox from './components/Common/MessageBox';
    import axios from 'axios';
    import qs from 'query-string'

    import {GlobalCommunication} from "./js/GlobalCommunication";
    import {InfoModule} from "./js/module-alpha";

    //路由
    let routes = [];

    export default {
        name: 'app',
        components: {
            ConstDom,
            ConstFooter,
            MessageBox
        },

        data(){
            return{
                transition : 'transition-left'
            }
        },

        methods: {

            httpGet(url, params, success, error) {
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                axios.defaults.withCredentials = true;
                axios.get(url, qs.stringify(params)).then((value) => {
                    success(value.data);
                }).catch((reason) => {
                    error(reason);
                });
            },

            httpPost(url, params, success, error) {
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                axios.defaults.withCredentials = true;
                axios.post(url, qs.stringify(params)).then((value) => {
                    success(value.data);
                }).catch((reason) => {
                    error(reason);
                });
            },

            refreshUserData() {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('account/v1/User.php', InfoModule.dir_api),
                    {},
                    (value) => {
                        if (value.data.res === InfoModule.response.requestSuccess) {
                            this.$store.commit('setUserInfo',value.data.data);
                            this.$store.commit('setUserInfo',{ online : true });
                        }
                        if(!this.$store.getters.userInfo.firstLoad) {
                            this.$store.commit('setUserInfo',{ firstLoad : true });
                            GlobalCommunication.$emit('firstLoadOver');
                        }
                    },
                    () => {
                        this.$utils.messageBox('用户数据刷新失败','warn');
                    }
                )
            },
        },

        mounted() {
            GlobalCommunication.$on('httpPost', this.httpPost);
            GlobalCommunication.$on('httpGet', this.httpGet);
            GlobalCommunication.$on('refreshUserData', this.refreshUserData);

            this.refreshUserData();
            this.httpGet(InfoModule.getUrlPath('extra/count/count.php',InfoModule.dir_api), {},()=>{},()=>{});
        },

        created(){
            //初始化路由数据
            for(let i in this.$router.options.routes){
                routes.splice(routes.length,0,this.$router.options.routes[i].name);
            }
        },

        watch : {
            //监听路由，界面切换动画
            $route(to , from){
                //判断向左滑还是向右滑
                const compare = routes.indexOf(to.name) > routes.indexOf (from.name);
                this.transition = compare ? 'transition-left' : 'transition-right';
            }
        }
    }

</script>

<style scoped>
    @import "style/main.css";

    .app{
        padding-right: 0;
        overflow: auto;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .card {
        box-shadow: 1px 1px 2px #a99f9f;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 70%;
        overflow: auto;
        background-color: rgba(255, 255, 255, 1);
        margin: 0 auto;
        border-radius: 5px;
    }

    .card-title {
        width: 30%;
        margin: 0 auto;
        text-align: center;
        color: rgb(62, 62, 62);
    }

    .card-content {
        width: 80%;
        margin: 0 auto;
        font-size: 15px;
        line-height: 20px;
    }

    .transition-body{
        transition: all 0.3s ease;
        position: absolute;
        width: 100%;
    }

    .transition-left-enter,
    .transition-right-leave-active {
        transform: translate(100%, 0);
    }

    .transition-left-leave-active,
    .transition-right-enter {
        transform: translate(-100%, 0);
    }
</style>
