/* 
    last update : 
        date : 2018/12/29
        new  : rewrite
    author:
        SRM_XY Yeuoly
    group:
        VSOV
    website:
        NotForget
*/

window.onload = function()
{
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        document.body.style.cssText = "MARGIN: 0; PADDING: 0;"
        var browerNav = document.createElement('div');
        browerNav.setAttribute('id', 'brower-nav');
        browerNav.innerHTML = '不好意思吼，这个网站比较辣鸡，不支持IE浏览器';
        browerNav.style.cssText = "FONT-SIZE: 12px; BACKGROUND: #00a1d6; COLOR: #fff; PADDING-BOTTOM: 10px; TEXT-ALIGN: center; PADDING-TOP: 10px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px;";
        document.body.appendChild(browerNav);
        return;
    }else{
        SettingHandle = new InitWeb();
    }

    var updateLog = new Vue({
        template : '<div id="updates-log" class="card">' +
            '            <h2 id="log-title" class="card-title">' +
            '                {{title}}' +
            '            </h2>' +
            '            <div class="vertical-blank-block"></div>' +
            '            <div id="updates-log-list">' +
            '                <ul>' +
            '                    <li v-for="log in updateLog">' +
            '                        <div class="updateLog">' +
            '                            <span class="updateLog-avatar"></span>' +
            '                            <span class="updateLog-title">{{log.date}} : {{log.title}}</span>' +
            '                            <span class="updateLog-blank-block"></span>' +
            '                            <span class="updateLog-content">{{log.content}}</span>' +
            '                        </div>' +
            '                        <div class="vertical-blank-block"></div>' +
            '                    </li>' +
            '                </ul>' +
            '            </div>' +
            '        </div>',
        data : {
            title : '网站更新日志',
            updateLog : [
                {
                    title   : '项目UserInfo启动 Version：0.0.0-alpha',
                    content : '启动项目，建立基础数据库，建立初步用户数据库结构，旨在建立一个帮助用户保存信息的网站，' +
                        '用于储存用户的私人信息，如账号密码等',
                    date    : '2018/10/01'
                },
                {
                    title   : '项目UserInfo初步完成 Version: 1.0.0-release',
                    content : '完成部分预期功能，初步上线测试，一共四个内测用户，预期功能正常运作',
                    date    : '2018/10/07'
                },
                {
                    title   : '项目改名NotForget Version: 1.0.1-alpha',
                    content : '项目改名，旨在建立一个帮助用户记录信息，爬取信息，以及周期性规律性地进行数据更新',
                    date    : '2018/11/10'
                },
                {
                    title   : '整体大更新 Version: 1.0.1-beta',
                    content : '分离前后端，更改cookie结构，网站安全性增强，建立msg页面，实现动态更新msg页面，' +
                        '更新jct获取方式，后端集成函数于function.php',
                    date    : '2018/12/01'
                },
                {
                    title   : '整体大更新，项目改名YeuolyBlog Version: 1.0.2-alpha',
                    content : '整体重构，后端改为面向对象编程，开始向github更新，去除页面壁纸，改为白色背景简约布局',
                    date    : '2019/1/28'
                },
                {
                    title   : '前端index完工 Version: 1.0.21-alpha',
                    content : '前端index.html index.css index.js基本完成，侧边顶部固定栏完成，整体框架' +
                        '升级为Vue.js，完善了代码结构，更容易看懂我在写什么辣鸡代码了',
                    date    : '2019/2/1'
                },
                {
                    title   : '基本功能完工 Version: 1.1-release',
                    content : '基本的功能已完成，并对之前的功能进行了一定的优化，可以第一次上线测试',
                    date    : '2019/2/16'
                }
            ],
            class : 'normal',
            normal : ''
        }
    });

    var about = new Vue({
        template : '<div class="card" id="about">' +
            '            <h2 id="about-title" class="card-title">' +
            '                {{title}}' +
            '            </h2>' +
            '            <div class="vertical-blank-block"></div>' +
            '            <div id="about-content" class="card-content">' +
            '                <div id="head">' +
            '                    {{content}}' +
            '                </div>' +
            '                <div id="techList">' +
            '                    <ul>' +
            '                        <li v-for="T in techList" class="tech-list-li">' +
            '                            <div class="techAbout">' +
            '                                <span class="techName">' +
            '                                    ● {{T.name}}' +
            '                                </span>' +
            '                                <span class="techContent">' +
            '                                    {{T.content}}' +
            '                                </span>' +
            '                            </div>' +
            '                        </li>' +
            '                    </ul>' +
            '                </div>' +
            '            </div>' +
            '        </div>',
        data : {
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
                    name : 'jQuery',
                    content : '也是学习阶段，用得也蛮菜的orz'
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
    });

    updateLog.$mount('#updateLogNode');
    about.$mount('#aboutNode');
};

//提供一个给全局访问的变量
var SettingHandle = null;