<template>
    <div :class="'user-menu' + (display ? ' user-menu-enter' : ' user-menu-leave')">
        <div class="user">
            <div class="avatar">
                <img :src="avatar ? avatar :'https://t1.picb.cc/uploads/2019/04/12/VLVfbv.png'"
                     alt=""
                     @error="setDefaultAvatar"
                >
            </div>
            <div class="id font--large text--white">
                <span>{{user.user_id}}</span>
            </div>
        </div>
        <hr>
        <div class="menu-func">
            <ul>
                <li v-for="dep in func" :key='dep.func' class="item font--small">
                    <div @click="functionSwitch(dep.func)">
                        <i class="yb-icon-font font--big-ex" v-html="dep.haircut"></i>
                        <span style="padding-left: 10px">{{dep.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>

    import { InfoModule } from '../../js/module-alpha';
    import { BaseUrl } from "../../js/module-alpha";
    import { GlobalCommunication } from "../../js/GlobalCommunication";

    export default {
        data () {
            let self = this;
            return {
                //侧边栏状态
                display : false,
                //侧边功能栏
                func: [
                    {
                        haircut : '&#xe60e;',
                        name : '回到网站主页',
                        about : '回到那个梦想开始的地方~',
                        func : 'index'
                    }, {
                        haircut : '&#xe600;',
                        name : '登录or注册',
                        about : '登录or注册',
                        func : 'passport'
                    }, {
                        haircut : '&#xe62f;',
                        name : '我的主页',
                        about : '回家咯~',
                        func : 'myIndex'
                    }, {
                        haircut : '&#xe6ed;',
                        name : '发送博客',
                        about : '也该干正事了',
                        func : 'send'
                    }, {
                        haircut : '&#xe629;',
                        name : '关于',
                        about : '估计你对这个没啥兴趣',
                        func : 'aboutPage'
                    }, {
                        haircut : '&#xe62a;',
                        name : 'FQ♂A',
                        about : '常见的问题这里都有',
                        func : 'qa'
                    }, {
                        haircut : '&#xe60d;',
                        name : '设置',
                        about : '设置',
                        func : 'setting'
                    }, {
                        haircut : '&#xe68e;',
                        name : '注销',
                        about : '嘤嘤嘤咱要溜了',
                        func : 'logOff'
                    },
                ],
                //用户数据
                user : self.$store.getters.userInfo,
                //头像
                avatar : ''
            }
        },
        methods : {
            //点击这个dom的时候的函数处理事件，使用一个function和多个key来判断不同情况下执行什么任务
            functionSwitch (key) {
                switch(key)
                {
                    case 'index':
                        this.$router.push({ name : 'index' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'passport':
                        this.$router.push({ name : 'passport' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'myIndex':
                        this.$router.push({ name : 'home' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'aboutPage':
                        this.$router.push({ name : 'about' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'logOff':
                        GlobalCommunication.$emit('httpGet',
                            InfoModule.getUrlPath('account/v1/LogOff.php',InfoModule.dir_api),
                            {},
                            (value) => {
                                if(value.data['res'] === InfoModule.response.requestSuccess)
                                {
                                    location.href = InfoModule.getUrlPath('',InfoModule.dir_web);
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
                        this.$router.push({ name : 'edit' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'setting':
                        this.$router.push({ name : 'setting' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                        break;
                    case 'qa':
                        this.$router.push({ name : 'qa' });
                        GlobalCommunication.$emit('closeSideMenu');
                        GlobalCommunication.$emit('closeBlackCover');
                }
            },
            //打开侧边栏
            openSideMenu () {
                this.display = true;
            },
            //关掉侧边栏
            closeSideMenu () {
                this.display = false;
            },
            //获取头像的url
            getAvatarUrl(hook){
                hook(this.avatar);
            },
            //添加监听事件
            initEvent() {
                GlobalCommunication.$on('openSideMenu',this.openSideMenu);
                GlobalCommunication.$on('closeSideMenu',this.closeSideMenu);
                GlobalCommunication.$on('getAvatarUrl',this.getAvatarUrl);
            },
            //设置头像
            setAvatar(){
                this.$utils.onFirstLoadUserInfo(() => {
                    this.avatar = InfoModule.getUrlPath('avatar/'+this.user.user_uid+'.jpg',InfoModule.dir_img);
                });
            },
            //设置默认头像
            setDefaultAvatar(){
                this.avatar = BaseUrl.defaultAvatar.get();
            }
        },
        created() {
            this.initEvent();
            this.setAvatar();
        }
    }

</script>

<style>

    .user-menu{
        width: 300px;
        height: 100%;
        position: fixed;
        top: 0;
        left: -300px;
        z-index: 2;
        transition: .2s;
        background-color: white;
        overflow: hidden;
    }

    .user-menu-enter{
        transform: translateX(300px);
        box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
    }

    .user-menu .user{
        padding: 10px;
        height: 80px;
        width: 100%;
        margin: 0 auto;
        background-color: #03a9f499;
    }

    .user-menu .avatar{
        height: 70px;
        float: left;
        margin-right: 30px;
        overflow: hidden;
        border-radius: 35px;
    }

    .user-menu .avatar img{
        width: 70px;
    }

    .user-menu hr{
        margin: 0;
        border-color: #03a9f487;
    }

    .user-menu .item{
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        padding-left: 30px;
        padding-bottom: 5px;
        padding-top: 5px;
        color: #616161 !important;
    }

    .user-menu .item:hover{
        background-color: #e4e4e4;
    }

</style>