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
    selectBackground();
    placeHeader();
    checkStatue();

    var updateLog = new Vue({
        el : '#includes',
        data : {
            updateLog : [
                {
                    content : "主页更新",
                    date    : "2019/1/26"
                }
            ]
        }
    });

    var about = new Vue({
        el : '#about',
        data : {
            about : {
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
                    }
                ]
            }
        }
    });

};

