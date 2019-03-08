<template>
    <div id="app">
        <ConstDom/>
        <MessageBox></MessageBox>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <ConstFooter/>
    </div>
</template>

<script>
    import ConstDom from './components/ConstDom';
    import ConstFooter from './components/ConstFooter';
    import MessageBox from './components/common/MessageBox';
    import axios from 'axios';
    import qs from 'query-string'

    import {GlobalCommunication} from "./js/GlobalCommunication";
    import {BaseModule} from "./js/module";
    import {FunctionGroup} from "./js/GlobalUtils";

    export default {
        name: 'app',
        components: {
            ConstDom,
            ConstFooter,
            MessageBox
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
                    BaseModule.getUrlPath('User.php', BaseModule.dir_api),
                    {},
                    (value) => {
                        if (value.data.res === BaseModule.response.requestSuccess) {
                            this.$store.commit('setUserInfo',value.data.data);
                        } else {

                        }
                    },
                    (reason) => {
                        console.log(reason);
                        FunctionGroup.alertBox('用户数据刷新失败');
                    }
                )
            }
        },

        mounted() {
            GlobalCommunication.$on('httpPost', this.httpPost);
            GlobalCommunication.$on('httpGet', this.httpGet);
            GlobalCommunication.$on('refreshUserData', this.refreshUserData);

            this.refreshUserData();
            this.$messageBox('hello world');
            this.$messageBox('fuckworld');
        }
    }

</script>

<style>
    @import "../public/css/main.css";

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
</style>
