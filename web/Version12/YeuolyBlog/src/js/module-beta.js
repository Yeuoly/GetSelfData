/**
 * 更新日志
 */
export let updateLog = [
    {
        title   : '新功能及美化 Version: 1.2.1.0-alpha',
        content : '大量修改了样式，布局风格修改，性能优化，修改了编辑器编码格式，添加修改用户个人信息' +
            '，增添Q&A界面和setting界面，添加了logo，终于有主页了，添加了访问量统计',
        date    : '2019/4/7'
    },
    {
        title   : '修复及优化 Version: 1.2.0.1-alpha',
        content : '修复标题会和操作栏以及正文重叠的bug，性能优化，编辑框升级添加工具栏，支持图片上传',
        date    : '2019/3/30'
    },
    {
        title   : '单页应用重构完成 Version: 1.2-release',
        content : '经过一段时间的重构，正式以单页应用的形式上线，为了更佳的体验，修改了大量样式',
        date    : '2019/3/23'
    },
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
];

/**
 * 关于
 */
export let normalIntroduction = '闲着没事造轮子，YeuolyBlog将会作为DataConnection网站的前身,' +
    '目前就是一个博客，之后会对这个进行各种魔改,' +
    '网站会在您的计算机上储存cookies，如果您不希望被储存此类数据，关掉就完事了。' +
    '联系我请发送邮件到admin@srmxy.cn。以下是本站使用到的工具。' +
    '还有件巨重要的事情，麻烦用Chrome访问，IE太屎了，css写得真的蛋疼，本职是高中生。' +
    '网站开源在github : https://github.com/Yeuoly/GetSelfData';

/**
 * 使用到的工具
 */
export let techList = [
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
        name : '&#xe6ae;',
        content : '百度开源的图表库'
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
];