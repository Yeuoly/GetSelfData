/* 
    last update : 
        date : 2018/12/22
        new  : post-card and so on
    author:
        SRM_XY Yeuoly
    group:
        VSOV
    website:
        NotForget
*/

window.onload = function () {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        document.body.style.cssText = "MARGIN: 0; PADDING: 0;"
        var browerNav = document.createElement('div');
        browerNav.setAttribute('id', 'brower-nav');
        browerNav.innerHTML = '不好意思吼，这个网站比较辣鸡，不支持IE浏览器';
        browerNav.style.cssText = "FONT-SIZE: 12px; BACKGROUND: #00a1d6; COLOR: #fff; PADDING-BOTTOM: 10px; TEXT-ALIGN: center; PADDING-TOP: 10px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px;";
        document.body.appendChild(browerNav);
        return;
    }

    //初始化界面
    this.constDom = new InitWeb();
    //设置
    this.constDom.functionGroup.bindUserOnloadNextTick(function () {
        functionGroup.getRecentPost(1,functionGroup.reloadMsg);
    });
    mainHandle = this;

    //创建Vue对象构造器
    //post wrap的Vue实例，body内如果isList为真则创建一个带有v-for的<li></li>dom对象，其中数据对应li，
    //html为body内的dom对象字符串，list为wrap中一个节点的子循环列表，必须是一个二维的表
    var includesConstructor = Vue.extend({
        template :
            '<div class="wrap" id="includes">' +
                '<ul class="post-card-ul">' +
                    '<li class="post-card-li" v-for="ev in postDepartment">' +
                        '<div class="vertical-blank-block"></div>' +
                        '<div class="post-card">' +
                            '<div class="post-card-head">' +
                                '<h3 class="post-title">' +
                                    '{{ev.title}}' +
                                    '<div class="post-card-deletion" @click="deletePost(ev.postID)">删除</div>' +
                                    '<div class="post-card-edition " @click="editPost(ev.postID)">编辑</div>' +
                                '</h3>' +
                                '<div class="post-card-userblock">' +
                                    '<div class="post-card-userblock-avatar"' +
                                        ' :style="{backgroundImage : \'url(  \' + ev.avatarUrl + \'  ) \'}"' +
                                    '>' +
                                    '</div>' +
                                    '<div class="post-card-userblock-id">' +
                                        '{{ev.user}}' +
                                    '</div>' +
                                '</div>' +
                                '<div class="post-introduction">' +
                                    '{{ev.introduction}}' +
                                '</div>' +
                            '</div>' +
                            '<div class="post-card-body">' +
                                '<ul class="post-card-body-ul">' +
                                    '<li class="post-card-body-li" v-for="bodyDep in ev.body">' +
                                        '<div v-if="bodyDep.html === \'blog\'">' +
                                            '<div class="post-card-body-blog">' +
                                                '{{bodyDep.src}}' +
                                            '</div>' +
                                        '</div>' +
                                        '<table v-else-if="bodyDep.html === \'table\'" class="post-card-body-table">' +
                                            '<tr v-for="dep in bodyDep.src">' +
                                                '<td v-for="(value,key) in dep" :tdKey="key">' +
                                                    '{{value}}' +
                                                '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                        '<div v-else-if="bodyDep.html === \'picture\'" class="post-card-body-picture">' +
                                            '<img class="post-card-body-img" :src="bodyDep.src" alt="/">' +
                                        '</div>' +
                                        '<div v-else-if="bodyDep.html === \'url\'" class="post-card-body-url">' +
                                            '<a :href="bodyDep.src">' +
                                                '链接：{{bodyDep.about}}' +
                                            '</a>' +
                                        '</div>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '</ul>' +
            '</div>',
        data : function() {
            return {
                postDepartment : [

                ]
            }
        },
        methods : {
            deletePost : function (postID) {
                mainHandle.constDom.functionGroup.http.post(
                    static_data.getUrlPath('dataAction/private/operate.php',static_data.m_URL_DOMAIN_API_DIR),
                    {
                        postID : postID,
                        method : 'delete'
                    },
                    {},
                    function (data) {
                        if(data['data']['res'] === static_data.response.requestSuccess)
                        {
                            constDom.functionGroup.alertBox('删除成功');
                            for(var i in includes.postDepartment)
                            {
                                if(includes.postDepartment[i].postID === postID)
                                {
                                    includes.postDepartment.splice(i,1);
                                }
                            }
                        }
                        else
                            constDom.functionGroup.alertBox(data['data']['error']);
                    },
                    function (textStatus) {
                        constDom.functionGroup.alertBox('errorCode:'+textStatus.status);
                    }
                );
            },
            editPost : function (postID) {
                location.href = static_data.getUrlPath('operate/editor-post.html?postID='+postID,static_data.m_URL_DOMAIN_WEB_DIR);
            }
        }
    });

    //创建Vue对象
    this.includes = new includesConstructor();

    //挂载Vue对象
    this.includes.$mount('#mountNode');
    //创建数据集合
    var dataGroup = {
        page : 1
    };
    this.dataGroup = dataGroup;
    //创建函数集合
    var functionGroup = {
        //类型、标题、用户信息、数据、简介
        addPostCard : function(post_title, post_user, post_user_id , post_data, post_introduction ,postID){
            //新建Vue的data对象
            //原本body内是单一的类型，后来想了想，一个post内应该有很多种不同类型的内容，所以将body改为了一个数组
            //body内学习wordpress的风格，用板块划分，一个板块内只允许一种类型的内容
            //使用数组记录body内的所有板块，html是最终要放到节点里的dom字符串
            //post_data里的数据是一个json字符串，其格式为
            //[
            //    {
            //        class : '',
            //        src : data for this class
            //    }
            //]
            //最终储存在Vue data里的应该为{html:'',src:''} html为给v-if判断类型的变量
            includes.postDepartment.push({
                title : post_title,
                user : post_user,
                userId : post_user_id,
                avatarUrl : static_data.getUrlPath('avatar/'+post_user_id+'.jpg',static_data.m_URL_DOMAIN_IMG_DIR),
                introduction : post_introduction,
                postID : postID,
                body : post_data
            });
        },
        //获取近期post，page是页面数，afterSuccess是一个function，在success中被调用，afterFail是在所有事情做完之后被调用
        getRecentPost :function (page , afterSuccess , afterFail) {
            mainHandle.constDom.functionGroup.http.post(
                static_data.getUrlPath('dataAction/private/getMyRecent.php',static_data.m_URL_DOMAIN_API_DIR),
                { page : page },
                {},
                function (data) {
                    console.log('getRecent post succeed');
                    if(parseInt(data['data']['res']) === static_data.response.requestSuccess)
                        afterSuccess(data);
                    else
                        constDom.functionGroup.alertBox('获取博客失败');
                },
                function () {
                    if(typeof afterFail === 'function')
                        afterFail();
                }
            );
        },
        //重载msg数据
        reloadMsg : function (data) {
            includes.postDepartment = [];
            functionGroup.loadNewMsg(data);
        },
        //装载新消息
        loadNewMsg : function (wholeData) {
            if(typeof wholeData['data']['isOver'] !== 'undefined')
            {
                //消息到底了
                isEnd = true;
            }
            var data = wholeData['data']['data'];
            for(var i in data){
                var post_data;
                try{
                    post_data = JSON.parse(data[i].post_data);
                }catch (e) {
                    post_data = [
                        {
                            html : 'blog',
                            src : data[i].post_data
                        }
                    ]
                }
                functionGroup.addPostCard(
                    data[i].post_title,
                    data[i].post_userID,
                    data[i].post_userUID,
                    post_data,
                    data[i].post_about,
                    data[i].post_ID
                );
            }
        }
    };

    //给外部一个访问函数集合的接口
    this.functionGroup = functionGroup;
};

var flag = true;
var isLoading = false;
var isEnd = false;

window.onscroll = function () {
    function myTry() {
        var documentTop = mainHandle.constDom.functionGroup.getDocumentTop();
        var scrollHeight = mainHandle.constDom.functionGroup.getScrollHeight();
        var windowHeight = mainHandle.constDom.functionGroup.getWindowHeight();
        if(scrollHeight === windowHeight + documentTop)
        {
            //进入加载状态
            isLoading = true;
            mainHandle.functionGroup.getRecentPost(mainHandle.dataGroup.page + 1 ,function (data) {
                mainHandle.functionGroup.loadNewMsg(data);
                //翻面
                mainHandle.dataGroup.page++;
                //加载完成
                isLoading = false;

            },function () {
                //加载完成
                isLoading = false;
            });
        }
    }
    //防止频繁调用 ， 当第一次调用完之后将flag改为true，为了避免在第一次调用的执行期间有新的事件
    //触发而没有调用，则在第一次调用的最后再手动调用一次
    if(flag && !isLoading && !isEnd)
    {
        flag = false;
        myTry();
        setTimeout(function () {
            flag = true;
            myTry();
        } , 1000);
    }
};

var mainHandle;