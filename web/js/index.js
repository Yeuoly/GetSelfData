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
    initWeb();
    checkStatue();

    var updateLog = new Vue({
        el : '#updates-log',
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
                    title   : '项目UserInfo初步完成 Version: 1.0.0-alpha',
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
                }
            ],
            class : 'normal',
            normal : ''
        }
    });

    var about = new Vue({
        el : '#about',
        data : {
            title : '关于本站',
            content : '闲着没事造轮子，YeuolyBlog将会作为DataConnection网站的前身,' +
                '目前就是一个博客，自认为具有很强的扩展性，很容易可以将此扩展为DataConnection,' +
                '网站会在您的计算机上储存cookies，如果您不希望被储存此类数据，请尽管嫌弃本站并砸死我然后扬长而去。' +
                '联系我请发送邮件到admin@srmxy.cn。以下是本站使用到的工具。',
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
                    name : 'mysql',
                    content : '数据库使用了mysql，据说MongoDB非常占内存和硬盘，虽然读取速度快一些，但考虑' +
                        '到我的辣鸡服务器内存和硬盘实在是堪忧，所以还是使用了mysql'
                }
            ]
        }
    });
};

