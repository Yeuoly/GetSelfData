<template>
    <div class="card yb-icon-font" id="about">
        <h3 id="about-title" class="card-title">
            {{title}}
        </h3>
        <div id="about-content" class="card-content">
            <div id="head">
                {{content}}
            </div>
            <div id="techList">
                <ul>
                    <li v-for="T in techList" class="tech-list-li">
                        <div class="techAbout">
                            <div class="techName">
                                <span v-html="T.name"></span>
                                &#xe648;
                            </div>
                            <span class="techContent">
                                {{T.content}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'AboutList',
        data : () => {
            return {
                title : '关于本站',
                content : '闲着没事造轮子，YeuolyBlog将会作为DataConnection网站的前身,' +
                    '目前就是一个博客，之后会对这个进行各种魔改,' +
                    '网站会在您的计算机上储存cookies，如果您不希望被储存此类数据，关掉就完事了。' +
                    '联系我请发送邮件到admin@srmxy.cn。以下是本站使用到的工具。' +
                    '还有件巨重要的事情，麻烦用Chrome访问，IE太屎了，css写得真的蛋疼，本职是高中生。',
                techList : [
                    {
                        name : '&#xe617;',
                        content : 'HTML5网站基础框架'
                    },
                    {
                        name : '&#xe63b;',
                        content : 'CSS样式表'
                    },
                    {
                        name : '&#xec68;',
                        content : 'JavaScript'
                    },
                    {
                        name : '&#xf25f;',
                        content : '使用了Vue.js框架，还不太会用，处于学习阶段，本站就作为练手（学习中）项目' +
                            '写得不好的地方望各位指出'
                    },
                    {
                        name : '&#xf25f;',
                        content : 'Vue全家桶，Vue-router路由 Vue-cli3.0脚手架 Vuex状态管理'
                    },
                    {
                        name : '&#xe699;',
                        content : 'axios作为网站的异步请求工具'
                    },
                    {
                        name : '&#xe743;',
                        content : 'picb是一个图床，因为咱的服务器太烂了，顶不死大图片，所以就传到第三方去了，' +
                            '这个图床非常良心，放心用。所有可以编辑图片的界面的左上角都会有上传按钮，官网地址：www.picb.cc'
                    },
                    {
                        name : '&#xe62c;',
                        content : 'iconfont这是一个阿里的矢量图库，官网地址：www.iconfont.cn'
                    },
                    {
                        name : '&#xe667;',
                        content : '数据库使用了MySQL，小网站，就没用MongoDB了'
                    },
                    {
                        name : '&#xf20e;',
                        content : '网站后端采用了PHP，因为好用，也是我用得较多的一门语言之一，也处于学习阶段，' +
                            '所以各个方面的优化可能还不尽人意，理解万岁~'
                    },
                    {
                        name : '&#xe615;',
                        content : 'PHPMailer https://github.com/PHPMailer/PHPMailer'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

    .card{
        -webkit-text-stroke-width: 0;
    }

    .techAbout{
        padding: 0;
        margin: 0;
        border: 0;
    }

    .techName{
        float: left;
        font-size: 16px;
    }

    .techContent{
        font-size: 13px;
        padding-left: 1px;
    }

    .tech-list-li{
        line-height: 25px;
        list-style: none;
    }

</style>