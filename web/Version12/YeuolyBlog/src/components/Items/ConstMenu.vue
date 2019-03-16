<template>
    <div class="user-menu"
         id="user-menu"
    >
        <div class="menu-user-block"
             id="menu-user-block"
        >
            <div class="menu-user-block-avatar"
                 id="menu-user-block-avatar"
            >
                <img id="menu-user-block-avatar-img"
                     class="menu-user-block-avatar-img"
                     :src="user.avatar"
                     alt=""
                >
            </div>
            <div class="menu-user-block-uid" id="menu-user-block-uid">
                <div class="menu-user-block-uid-txt" id="menu-user-block-uid-txt">
                    |uid : {{user.user_uid}}
                </div>
            </div>
            <div class="menu-user-block-id" id="menu-user-block-id">
                <div class="menu-user-block-id-txt" id="menu-user-block-id-txt">
                    |id : {{user.user_id}}
                </div>
            </div>
        </div>
        <hr class="menu-user-block-div-line">
        <div class="menu-func" id="menu-func">
            <ul class="menu-func-ul" id="menu-func-ul">
                <li v-for="dep in func" :key='dep.func'>
                    <div class="menu-func-li-btn-block" @click="functionSwitch(dep.func)">
                        <div class="menu-func-li-btn-block-txt">{{dep.name}}</div>
                        <div class="menu-func-li-btn-block-about">{{dep.about}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>

    import { BaseModule } from '../../js/module';
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { router } from "../../router";

    export default {
        data () {
            let self = this;
            return {
                //侧边功能栏
                func: [
                    {
                        name : '回到网站主页',
                        about : '回到那个梦想开始的地方~',
                        func : 'index'
                    },
                    {
                        name : '登录or注册',
                        about : '登录or注册',
                        func : 'passport'
                    },
                    {
                        name : '我的主页',
                        about : '字面意思呀，巴拉拉能量让你回到自己的主页！',
                        func : 'myIndex'
                    },
                    {
                        name : '发post去',
                        about : '皮皮站，咱们去发博客！',
                        func : 'send'
                    },
                    {
                        name : '关于',
                        about : '估计你对这个没啥兴趣',
                        func : 'aboutPage'
                    },
                    {
                        name : '注销',
                        about : '嘤嘤嘤咱要溜了',
                        func : 'logOff'
                    }
                ],
                //用户数据
                user : self.$store.getters.userInfo,
                //侧边菜单栏的css参数
            }
        },
        methods : {
            //点击这个dom的时候的函数处理事件，使用一个function和多个key来判断不同情况下执行什么任务
            functionSwitch : function(key)
            {
                switch(key)
                {
                    case 'index':
                        router.replace('/');
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'passport':
                        router.replace('/passport');
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'myIndex':
                        router.replace('/home');
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'aboutPage':
                        router.replace('/about');
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'logOff':
                        GlobalCommunication.$emit('httpGet',
                            BaseModule.getUrlPath('LogOff.php',BaseModule.dir_api),
                            {},
                            (value) => {
                                if(value.data['res'] === BaseModule.response.requestSuccess)
                                {
                                    location.href = BaseModule.getUrlPath('',BaseModule.dir_web);
                                }else {
                                    this.$utils.messageBox(value.data['error'],'warn');
                                }
                            },
                            () => {
                                this.$utils.messageBox('发送了意外的错误','warn');
                            }
                        );
                        break;
                    case 'send':
                        router.replace('/edit');
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                }
            },
            //打开侧边栏
            openSideMenu : function () {
                //获取右侧边栏dom
                let menu = document.getElementById('user-menu');
                menu.style.setProperty('transform','translateX(300px)');
                setTimeout(function () {
                    menu.style.setProperty('box-shadow','2px 0px 1px rgb(173, 150, 150)');
                });
            },
            //关掉侧边栏
            closeSideMenu : function () {
                let menu = document.getElementById('user-menu');
                menu.style.setProperty('transform','translateX(0px)');
                setTimeout(function () {
                    menu.style.setProperty("box-shadow","0px 0px 0px rgb(173, 150, 150)");
                } , 500);
            },
            //添加监听事件
            initEvent() {
                GlobalCommunication.$on('openSideMenu',this.openSideMenu);
                GlobalCommunication.$on('closeSideMenu',this.closeSideMenu);
            },
            //返回用户数据
        },
        created() {
            this.initEvent();
        }
    }

</script>

<style>
    #menu-user-block-avatar-img{
        width: 60px;
        height: 60px;
    }

    #user-menu{
        width: 300px;
        height: 100%;
        position: fixed;
        top: 0;
        left: -300px;
        background-color: transparent;;
        z-index: 2;
        /* Transition left */
        transition: .2s;
        -moz-transition: .2s; /* Firefox 4 */
        -webkit-transition: .2s; /* Safari and Chrome */
        -o-transition: 0.2s; /* Opera */
    }

    #menu-user-block{
        overflow: auto;
        padding-left: 5%;
        padding-top: 5%;
        width: 90%;
        margin: 0 auto;
        height: 10vh;
    }

    #menu-user-block-avatar{
        float: left;
        border-radius: 50%;
        overflow: hidden;
        width: 15%;
        min-width: 45px;
    }

    #menu-user-block-avatar-img{
        width: 100%;
    }

    #menu-user-block-id{
        margin: 0 auto;
        float: right;
        width: 75%;
        height: 20%;
    }

    #menu-user-block-uid{
        margin: 0 auto;
        float: right;
        width: 75%;
        height: 20%;
        padding-bottom: 20px;
    }

    #menu-user-block-id-txt{
        text-align: left;
        height: 100%;
        vertical-align: middle;
        font-size: 18px;
        color: #ffffffeb;
    }

    #menu-user-block-uid-txt{
        text-align: left;
        height: 100%;
        vertical-align: middle;
        font-size: 18px;
        color: #ffffffeb;
    }

    .menu-user-block-div-line{
        color: white;
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 0px;
        flex: 1 1 0px;
        max-width: 100%;
        height: 0;
        max-height: 0;
        border: solid;
        border-width: thin 0 0 0;
        -webkit-transition: inherit;
        transition: inherit;
    }

    .menu-func-ul{
        margin: 0;
        padding: 0;
    }

    .menu-func-ul li{
        list-style: none;
    }

    .menu-func-li-btn-block{
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: transparent;
        cursor: pointer;
    }

    .menu-func-li-btn-block:hover{
        background-color: #ffa0a047;
    }

    .menu-func-li-btn-block-txt{
        font-size: 18px;
        margin: 0 auto;
        width: 90%;
        color: #ffffffeb;
    }

    .menu-func-li-btn-block-about{
        font-size: 14px;
        margin: 0 auto;
        width: 90%;
        color: #ffffffeb;
    }

    .header-function-list-dep {
        border-radius: 50%;
        padding: 5px;
        margin: auto;
        float: left;
        height: 35px;
        width: 35px;
        background-color: transparent;
        cursor: pointer;
        font-size: 25px;
        text-align: center;
        vertical-align: middle;
        color: white;
    }

    .header-function-list-depInner{
        border-radius: 50%;
        background-color: transparent;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 25px;
        text-align: center;
        vertical-align: middle;
        color: white;
    }

</style>