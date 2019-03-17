<template>
    <div id="updates-log" class="card yb-icon-font">
        <h3 id="log-title" class="card-title">
            {{title}}
        </h3>
        <div id="updates-log-list">
            <ul>
                <li v-for="log in updateLog">
                    <div class="updateLog">
                        <span class="updateLog-title">{{log.date}} &#xe648; {{log.title}}</span>
                        <span class="updateLog-blank-block"></span>
                        <span class="updateLog-content"> &#xe648; {{log.content}}</span>
                    </div>
                    <div class="vertical-blank-block"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'IndexUpdateLog',
        props : {

        },
        data : () => {
            return {
                title : '网站更新日志',
                updateLog :[
                    {
                        title   : '开始大规模重构 Version: 1.2-alpha',
                        content : '考虑到网站的兼容性、可管理性、可扩展性等因素，对网站前端进行了大规模重构' +
                            '，改为单页应用，正式使用webpack和vue-cli',
                        date    : '2019/2/30'
                    },
                    {
                        title   : '基本功能完工 Version: 1.1-release',
                        content : '基本的功能已完成，并对之前的功能进行了一定的优化，可以第一次上线测试',
                        date    : '2019/2/16'
                    },
                    {
                        title   : '前端index完工 Version: 1.0.21-alpha',
                        content : '前端index.html index.css index.js基本完成，侧边顶部固定栏完成，整体框架' +
                            '升级为Vue.js，完善了代码结构，更容易看懂我在写什么辣鸡代码了',
                        date    : '2019/2/1'
                    },
                    {
                        title   : '整体大更新，项目改名YeuolyBlog Version: 1.0.2-alpha',
                        content : '整体重构，后端改为面向对象编程，开始向github更新，去除页面壁纸，改为白色背景简约布局',
                        date    : '2019/1/28'
                    },
                    {
                        title   : '整体大更新 Version: 1.0.1-beta',
                        content : '分离前后端，更改cookie结构，网站安全性增强，建立msg页面，实现动态更新msg页面，' +
                            '更新jct获取方式，后端集成函数于function.php',
                        date    : '2018/12/01'
                    },
                    {
                        title   : '项目改名NotForget Version: 1.0.1-alpha',
                        content : '项目改名，旨在建立一个帮助用户记录信息，爬取信息，以及周期性规律性地进行数据更新',
                        date    : '2018/11/10'
                    },
                    {
                        title   : '项目UserInfo初步完成 Version: 1.0.0-release',
                        content : '完成部分预期功能，初步上线测试，一共四个内测用户，预期功能正常运作',
                        date    : '2018/10/07'
                    },
                    {
                        title   : '项目UserInfo启动 Version：0.0.0-alpha',
                        content : '启动项目，建立基础数据库，建立初步用户数据库结构，旨在建立一个帮助用户保存信息的网站，' +
                            '用于储存用户的私人信息，如账号密码等',
                        date    : '2018/10/01'
                    }
                ],
            }
        }
    }
</script>

<style scoped>
    #updates-log-list li{
        list-style: none;
    }

    .card{
        -webkit-text-stroke-width: 0;
    }

    .updateLog{
        width: 100%;
        overflow: auto;
        margin: 0 auto;
    }

    .updateLog-title{
        font-size: 16px;
        width: 90%;
    }

    .updateLog-content{
        float: left;
        font-size: 14px;
        width: 90%;
    }

    .updateLog-blank-block{
        width: 100%;
        height: 8px;
        padding: 0;
        margin: 0;
        border: 0;
    }
</style>