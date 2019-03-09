<template>
    <div class="card" id="about">
        <h2 id="about-title" class="card-title">
            {{title}}
        </h2>
        <div class="vertical-blank-block"></div>
        <div id="about-content" class="card-content">
            <div id="head">
                {{content}}
            </div>
            <div id="techList">
                <ul>
                    <li v-for="T in techList" class="tech-list-li">
                        <div class="techAbout">
                            <span class="techName">
                                ● {{T.name}}
                            </span>
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
                        name : 'JavaScript',
                        content : '屁话'
                    },
                    {
                        name : 'Html5 CSS3',
                        content : '还是屁话'
                    },
                    {
                        name : 'Vue.js',
                        content : '使用了Vue.js框架，还不太会用，处于学习阶段，本站就作为练手（学习中）项目' +
                            '写得不好的地方望各位指出'
                    },
                    {
                        name : 'Vue全家桶',
                        content : 'Vue-router Vue-cli Vuex等'
                    },
                    {
                        name : 'axios',
                        content : '代替了原本使用的Jquery的异步请求'
                    },
                    {
                        name : 'php',
                        content : '网站后端采用了php，因为好用，也是我用得较多的一门语言之一，也处于学习阶段，' +
                            '所以各个方面的优化可能还不尽人意，理解万岁~'
                    },
                    {
                        name : 'phpMailer',
                        content : 'https://github.com/PHPMailer/PHPMailer'
                    },
                    {
                        name : 'mysql',
                        content : '数据库使用了mysql，小网站，就没用MongoDB了'
                    },
                    {
                        name : 'picb',
                        content : '这是一个图床，因为咱的服务器太烂了，顶不死大图片，所以就传到第三方去了，' +
                            '这个图床非常良心，放心用。所有可以编辑图片的界面的左上角都会有上传按钮'
                    }
                ]
            }
        }
    }
</script>

<style>
    .techAbout{
        overflow: auto;
        padding: 0;
        margin: 0;
        border: 0;
    }

    .techName{
        float: left;
        width: 15%;
    }

    .techContent{
        float: right;
        width: 85%;
    }

    .tech-list-li{
        line-height: 25px;
        list-style: none;
    }

</style>