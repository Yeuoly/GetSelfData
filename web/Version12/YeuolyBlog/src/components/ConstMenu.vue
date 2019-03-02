<template>
    <div class="user-menu"
         id="user-menu"
    >
        <div class="menu-user-block"
             id="menu-user-block"
        >
            <div class="menu-user-block-avatar"
                 id="menu-user-block-avatar"
                 :style='"width:"+css.UserBlockAvatarSize+"px;height:"+css.UserBlockAvatarSize+"px;"'
            >
                <img id="menu-user-block-avatar-img"
                     class="menu-user-block-avatar-img"
                     :src="user.avatar"
                     :style='"width: "+css.UserBlockAvatarSize+"px;"'
                >
            </div>
            <div class="menu-user-block-uid" id="menu-user-block-uid">
                <div class="menu-user-block-uid-txt" id="menu-user-block-uid-txt">
                    |uid : {{user.user_uid}}
                </div>
            </div>
            <div class="menu-user-block-id" id="menu-user-block-id">
                <div class="menu-user-block-id-txt" id="menu-user-block-id-txt" v-on="{click: !user.online && goToLogin}">
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

    import { BaseModule } from '../js/module';
    import { FunctionGroup } from "../js/GlobalUtils";
    import { GlobalCommunication } from "../js/GlobalCommunication";
    import { router } from "../router";
    import { user_data } from "../main";

    export default {
        data () {
            return {
                //侧边功能栏
                func: [
                    {
                        name : '回到网站主页',
                        about : '回到那个梦想开始的地方~',
                        func : 'index'
                    },
                    {
                        name: '我的主页',
                        about: '字面意思呀，巴拉拉能量让你回到自己的主页！',
                        func: 'myIndex'
                    },
                    {
                        name : '发post去',
                        about : '皮皮站，咱们去发博客！',
                        func : 'send'
                    },
                    {
                        name: '关于',
                        about: '估计你对这个没啥兴趣',
                        func: 'aboutPage'
                    },
                    {
                        name: '注销',
                        about: '嘤嘤嘤咱要溜了',
                        func: 'logOff'
                    }
                ],
                //用户数据
                user : user_data,
                //侧边菜单栏的css参数
                css : {
                    left : 0,
                    width : 0,
                    UserBlockAvatarSize : 0,
                    UserBlockHeight : 0,
                    UserBlockTxtSize : 0
                }
            }
        },
        methods : {
            //点击这个dom的时候的函数处理事件，使用一个function和多个key来判断不同情况下执行什么任务
            functionSwitch : function(key)
            {
                function switchUrl(p) {
                    return BaseModule.getUrlPath(p,BaseModule.m_URL_DOMAIN_WEB_DIR);
                }
                switch(key)
                {
                    case 'index':
                        router.replace('/');
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
                            BaseModule.getUrlPath('LogOff.php',BaseModule.m_URL_DOMAIN_API_DIR),
                            {},
                            (value) => {
                                if(value.data['res'] === BaseModule.response.requestSuccess)
                                {
                                    location.href = BaseModule.getUrlPath('',BaseModule.m_URL_DOMAIN_WEB_DIR);
                                }else {
                                    FunctionGroup.alertBox(value.data['error']);
                                }
                            },
                            () => {
                                FunctionGroup.alertBox('发送了意外的错误');
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
            goToLogin () {
                //router.go(0);
            },
            //添加监听事件
            initEvent() {
                GlobalCommunication.$on('openSideMenu',this.openSideMenu);
                GlobalCommunication.$on('closeSideMenu',this.closeSideMenu);
            },
            //返回用户数据
        },
        created() {
            //获取屏幕大小
            let winSize = FunctionGroup.getWindowSize();
            let winWidth = winSize.windowWidth;
            this.css.UserBlockAvatarSize = 60;
            this.css.UserBlockHeight = winWidth * 0.045;
            this.css.left = -300;
            this.css.width = 300;
            this.css.UserBlockTxtSize = 18;

            this.initEvent();
        }
    }

</script>