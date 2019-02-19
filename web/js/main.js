/**
 *
 * GetSelfData main.js
 * author : SRM_XY Yeuoly
 * Copyright : VSOV-2018-2019
 * Editor by IDEA and VSCODE
 * Thanks to Vue.js
 *
 * */

function InitWeb()
{
    //提供一个给子级对象访问父级的handle
    var app_self = this;

    //函数集合，为了方便调用就把它们封装在一个去全局对象内了
    //所有函数完全独立，已避免互相调用
    var functionGroup = {
        //获取用户的登录状态
        isOnline :function () {
            return app_self.constDom.menu.user.online;
        },
        //打开黑幕，关闭黑幕需要手动调用closeBlackCover，或者给黑幕绑定上点击黑幕就关闭的事件
        openBlackCover : function () {
            //首先把黑色幕布的z-index值调大，盖住整个屏幕
            var black_cover = document.getElementById('black-cover');
            black_cover.style.setProperty('z-index','2');
            black_cover.style.setProperty('opacity','0.6');
        },
        //关掉黑幕，并移除黑幕的所有绑定事件
        closeBlackCover : function () {
            //获取黑色幕布的dom
            var black_cover = document.getElementById('black-cover');
            black_cover.style.setProperty('opacity','0');
            setTimeout(function () {
                black_cover.style.setProperty('z-index','-1');
            } , 500);
        },
        //打开侧边栏
        openSideMenu : function () {
            //获取右侧边栏dom
            var menu = document.getElementById('user-menu');
            //使用一个计时器逐渐移动侧边栏
            menu.style.setProperty('transform','translateX(300px)');
            setTimeout(function () {
                menu.style.setProperty('box-shadow','2px 0px 1px rgb(173, 150, 150)');
            });
        },
        //关掉侧边栏
        closeSideMenu : function () {
            var menu = document.getElementById('user-menu');
            menu.style.setProperty('transform','translateX(0px)');
            setTimeout(function () {
                menu.style.setProperty("box-shadow","0px 0px 0px rgb(173, 150, 150)");
            } , 500);
        },
        //到网站主页去
        goToIndex : function () {
            location.href = static_data.getUrlPath('',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //到自己的主页去
        goToMyIndex : function () {
            location.href = static_data.getUrlPath("msg.html",static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //移动到更新日志
        goToUpdateLog : function () {
            if(document.location.href === static_data.getUrlPath('',static_data.m_URL_DOMAIN_WEB_DIR) ||
                document.location.href === static_data.getUrlPath('index.html',static_data.m_URL_DOMAIN_WEB_DIR))
                functionGroup.smoothScrollMove('updates-log-list');
            else
                document.location = static_data.getUrlPath('#updates-log-list',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //跳转页面到登录界面
        goToLogin : function () {
            location.href = static_data.getUrlPath('passport.html',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //硬核翻译，发博客去
        goToSendPost : function () {
            location.href = static_data.getUrlPath('operate/editor-post.html',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //锚点平滑移动
        smoothScrollMove : function(id){
            $("html,body").animate({
                scrollTop : $("#" + id).offset().top
            }, 200);
        },
        //注销
        logOff : function () {
            if(app_self.constDom.menu.user.online)
            {
                $.ajax({
                    url : static_data.getUrlPath("LogOff.php",static_data.m_URL_DOMAIN_API_DIR),
                    async : true,
                    type : "get",
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    xhrFields: {
                        withCredentials: true
                    },
                    success : function(data)
                    {
                        if(data['data']['res'] === static_data.response.passjct.success)
                        {
                            functionGroup.clearUserInfo();
                        }
                    }
                });
            }
        },
        //设置用户信息，键值与值相对应
        setUserInfo : function (key, val) {
            app_self.constDom.menu.user[key] = val;
        },
        //设置用户信息，传入值为一个数组，键值与值相对应
        setUserInfoArray : function (ary) {
            for(var key in ary){
                app_self.functionGroup.setUserInfo(key,ary[key]);
            }
        },
        //清除用户信息
        //这里肯定要优化的，只是现阶段被这个js的引用型变量搞得很烦。。
        clearUserInfo : function () {
            app_self.constDom.menu.user = {
                user_id: '未登录，点击登录',
                user_uid: '-1',
                user_email: 'example@google.com',
                user_lv: '0',
                user_exp: '0',
                user_class: '',
                avatar: 'http://hbimg.b0.upaiyun.com/a12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658',
                srm_jct: '',
                login_time: '0',
                online: false
            }
        },
        //登录检测
        passJct : function() {
            var self = this;
            $.ajax({
                url : static_data.getUrlPath("User.php",static_data.m_URL_DOMAIN_API_DIR),
                async : true,
                type : "post",
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                xhrFields: {
                    withCredentials: true
                },
                success : function(data)
                {
                    if(data['data']['res'] === static_data.response.passjct.success)
                    {
                        self.setUserInfoArray(data['data']['data']);
                        self.setUserInfo('online',true);
                        self.setUserInfo(
                            'avatar' ,
                            static_data.getUrlPath('avatar/'+data['data']['data']['user_uid']+'.jpg',static_data.m_URL_DOMAIN_IMG_DIR)
                        );
                        var handle_user_id_txt = $("#menu-user-block-id-txt");
                        handle_user_id_txt.css('cursor','default');
                        //执行用户数据更新完之后的跟随事件
                        for(var i in dataGroup.userOnloadNextTick)
                        {
                            dataGroup.userOnloadNextTick[i]();
                        }
                    }
                }
            });
        },
        //添加用户信息加载完之后的跟随事件
        bindUserOnloadNextTick : function(src){
            if(typeof src === 'function')
                dataGroup.userOnloadNextTick.push(src);
            else
                console.error('userOnloadNextTick : wrong type');
        },
        //解绑所有绑定事件，这里不分什么固定事件不固定事件啥的
        unbindUserOnloadNextTick : function(){
            //直接覆盖就完事了，剩下的任务留给浏览器
            dataGroup.userOnloadNextTick = [];
        },
        //获取用户信息
        getUserInfo : function (index) {
            if(typeof index === 'undefined')
                return app_self.constDom.menu.user;
            if(typeof app_self.constDom.menu.user[index] !== 'undefined')
                return app_self.constDom.menu.user[index];
            console.error('illegal index in getUserInfo(index)');
        },
        //
        isPC : function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++)
            {
                if (userAgentInfo.indexOf(Agents[v]) > 0)
                {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //获取当前cookies的字典
        getParamsArray : function () {
            var url = document.location.toString();
            var urlParamsStr = url.split('?')[1];
            if(typeof urlParamsStr === 'undefined')return;
            var urlParamsAry = urlParamsStr.split('&');
            var _urlParamsAry = [];
            for(var i in urlParamsAry)
            {
                var buf = urlParamsAry[i].split('=');
                _urlParamsAry[buf[0]] = buf[1];
                _urlParamsAry.length++;
            }
            return _urlParamsAry;
        },
        //mode为空，即只有一个确认按钮，mode为1时有确认和取消两个按钮
        //网上抄的消息框，自己修改了一下样式和弹出动画，删除了原本的遮罩层
        //原地址https://blog.csdn.net/java_goodstudy/article/details/51482324
        alertBox : function (msg, mode) {
            msg = msg || '';
            mode = mode || 0;
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            var isIe = (document.all) ? true : false;
            var isIE6 = isIe && !window.XMLHttpRequest;
            var sTop = document.documentElement.scrollTop || document.body.scrollTop;
            var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var winSize = function(){
                var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
                // innerHeight获取的是可视窗口的高度，IE不支持此属性
                if (window.innerHeight && window.scrollMaxY) {
                    xScroll = document.body.scrollWidth;
                    yScroll = window.innerHeight + window.scrollMaxY;
                } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
                    xScroll = document.body.scrollWidth;
                    yScroll = document.body.scrollHeight;
                } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                    xScroll = document.body.offsetWidth;
                    yScroll = document.body.offsetHeight;
                }

                if (self.innerHeight) {    // all except Explorer
                    windowWidth = self.innerWidth;
                    windowHeight = self.innerHeight;
                } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                    windowWidth = document.documentElement.clientWidth;
                    windowHeight = document.documentElement.clientHeight;
                } else if (document.body) { // other Explorers
                    windowWidth = document.body.clientWidth;
                    windowHeight = document.body.clientHeight;
                }

                // for small pages with total height less then height of the viewport
                if (yScroll < windowHeight) {
                    pageHeight = windowHeight;
                } else {
                    pageHeight = yScroll;
                }

                // for small pages with total width less then width of the viewport
                if (xScroll < windowWidth) {
                    pageWidth = windowWidth;
                } else {
                    pageWidth = xScroll;
                }

                return{
                    'pageWidth':pageWidth,
                    'pageHeight':pageHeight,
                    'windowWidth':windowWidth,
                    'windowHeight':windowHeight
                }
            }();
            //弹出框
            var styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
            var alertBox = document.createElement('div');
            alertBox.id = 'alertMsg';
            alertBox.style.cssText = styleStr1;
            //创建弹出框里面的内容P标签
            var alertMsg_info = document.createElement('P');
            alertMsg_info.id = 'alertMsg_info';
            alertMsg_info.innerHTML = msg;
            alertBox.appendChild(alertMsg_info);
            //创建按钮
            var btn1 = document.createElement('a');
            btn1.id = 'alertMsg_btn1';
            btn1.href = 'javascript:void(0)';
            btn1.innerHTML = '<cite>确定</cite>';
            btn1.onclick = function () {
                closeAlertBox();
                return true;
            };
            alertBox.appendChild(btn1);
            if (mode === 1) {
                var btn2 = document.createElement('a');
                btn2.id = 'alertMsg_btn2';
                btn2.href = 'javascript:void(0)';
                btn2.innerHTML = '<cite>取消</cite>';
                btn2.onclick = function () {
                    closeAlertBox();
                    return false;
                };
                alertBox.appendChild(btn2);
            }
            document.body.appendChild(alertBox);
            app_self.functionGroup.openBlackCover();

            //逐渐消失的动画
            function closeAlertBox(){
                alertBox.style.opacity = 1;
                var timer = setInterval(function () {
                    var opacity = alertBox.style.opacity;
                    alertBox.style.opacity = opacity - 0.02;
                    if(opacity + 0.02 <= 1)
                    {
                        document.body.removeChild(alertBox);
                        clearInterval(timer);
                        app_self.functionGroup.closeBlackCover();
                        app_self.functionGroup.closeSideMenu();
                    }
                } , 2);
            }
        },
        //创建dom的方法
        cDom : function(type,className,id,innerHtml){
            var v = $("<" + type + ">");
            if(className != null)
                v.attr('class',className);
            if(id != null)
                v.attr('id',id);
            if(innerHtml != null)
                v.html(innerHtml);
            return v;
        },
        setWebIcon : function() {
            var link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = static_data.getUrlPath('img/shortcut.ico',static_data.m_URL_DOMAIN_WEB_DIR);
            document.head.appendChild(link);
        },
        //设置标题
        setTitle : function(){
            document.title = static_data.getWebTitle();
        },
        //修改css样式
        //设置左侧菜单栏左边界坐标
        setMenuLeft : function (value) {
            app_self.constDom.menu.css.left = value;
        },
        //设置黑色幕布透明度
        setBlackCoverOpacity : function (value) {
            app_self.constDom.black_cover.css.opacity = value;
        },
        //获取左侧菜单栏左边界坐标
        getMenuLeft : function () {
            return app_self.constDom.menu.css.left;
        },
        //设置黑色幕布透明度
        getBlackCoverOpacity : function () {
            return app_self.constDom.black_cover.css.opacity;
        },
        //获取左侧菜单栏宽度
        getMenuWidth : function () {
            return app_self.constDom.menu.css.width;
        },
        //获取指定cookie
        getDestinationCookie : function (cookieName) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for(var i = 0; i < arrCookie.length; i++)
            {
                var arr = arrCookie[i].split("=");
                if(cookieName === arr[0])return arr[1];
            }
            return false;
        },
        //向black_cover中添加点击事件，传入值需要是一个字典，其中的func成员将会被绑定到black_cover的onclick事件中
        //传入值还可以是个function
        //需要注意的是，当触发了onclick事件之后所有的绑定都会被清理
        blackCoverBindClick : function(src) {
            app_self.constDom.black_cover.bind(src);
        },
        //获取滚动条高度
        getScrollHeight : function () {
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if (document.body) {
                bodyScrollHeight = document.body.scrollHeight;
            }
            if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        },
        //获取可视窗口高度
        getWindowHeight : function () {
            var windowHeight = 0;
            if (document.compatMode === "CSS1Compat") {
                windowHeight = document.documentElement.clientHeight;
            } else {
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        },
        //获取文档高度
        getDocumentTop : function () {
            var scrollTop =  0, bodyScrollTop = 0, documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        },
        //给页眉加一点功能，算是个钩子叭~
        addHeaderFunc :function (innerHtml, handler, className, id) {
            if(typeof innerHtml !== 'string')return;
            handler = typeof handler === 'function' ? handler : function () {};
            className = className ? className : 'headerList-default';
            id = id ? id : '#';
            app_self.constDom.header.headerFunctionList.push({
                className : className,
                click : handler,
                id : id,
                innerHtml : innerHtml
            });
        }
    };

    //同上面一样，封装在一起的一堆数据
    var dataGroup = {
        //用于缓存用户数据加载完之后的跟随事件
        userOnloadNextTick : [
            //example
          /*function(){
                //do something
            }*/
        ]
    };

    //给外部访问集合的接口
    this.functionGroup = functionGroup;
    this.dataGroup = dataGroup;

    //创建dom和Vue对象
    this.constDom = new createVue();

    //设置标题
    functionGroup.setWebIcon();
    functionGroup.setTitle();

    //检测用户登录情况
    functionGroup.passJct();

    //创建侧边栏和顶层的dom对象，并赋予类名和id以及innerHtml
    //这是一个构造器
    function createVue() {
        //创建挂载节点
        var _header = document.createElement('div');
        _header.id = '_header';
        var _menu   = document.createElement('div');
        _menu.id = '_menu';
        var _black_cover = document.createElement('div');
        _black_cover.id = '_black_cover';
        var _footer = document.createElement('div');
        _footer.id = '_footer';

        //向html中添加挂载节点
        var app = document.getElementById('app');

        app.parentNode.insertBefore(_black_cover,app);
        app.parentNode.insertBefore(_menu,app);
        app.parentNode.insertBefore(_header,app);
        document.body.appendChild(_footer);

        //初始化css参数
        var menuWidth , menuLeft , menuUserBlockHeight , menuUserBlockTxtSize ,
            menuUserBlockAvatarSize;

        //修整PC与PE的侧边栏宽度
        if(!functionGroup.isPC())
        {
            menuWidth = innerWidth * 0.7;
            menuLeft = -menuWidth;
            menuUserBlockHeight = innerWidth * 0.12;
            menuUserBlockTxtSize = innerWidth * 0.03;
            menuUserBlockAvatarSize = innerWidth * 0.7 * 0.15;
        }else{
            menuUserBlockAvatarSize = 60;
            menuUserBlockHeight = innerWidth * 0.045;
            menuLeft = -300;
            menuWidth = 300;
            menuUserBlockTxtSize = 18;
        }

        //创建Vue构造器
        //头部固定栏
        var header = Vue.extend({
            template : '<div class="header" id="header">' +
                '           <div class="user-block-open header-function-list-dep" id="user-block-open">' +
                '               <div ' +
                '                   class="user-block-open-click" ' +
                '                   id="user-block-open-click"' +
                '                   @click="mouseClickMenuButton"' +
                '               >' +
                '                   ≡≡' +
                '               </div>' +
                '           </div>' +
                '           <ul id="header-function-list" v-for="dep in headerFunctionList">' +
                '               <li class="header-function-list">' +
                '                   <div class="header-function-list-dep">' +
                '                       <div class="header-function-list-depInner">' +
                '                           <div ' +
                '                               name="DHolder"' +
                '                               v-html="dep.innerHtml" ' +
                '                               :class="dep.className" ' +
                '                               @click="dep.click"' +
                '                               :id="dep.id"' +
                '                           >' +
                '                           </div>' +
                '                       </div>' +
                '                   </div>' +
                '               </li>' +
                '           </ul>' +
                '       </div>',
            data : function(){
                return {
                    headerFunctionList : [

                    ]
                }
            },
            methods : {
                mouseClickMenuButton : function() {
                    functionGroup.openSideMenu();
                    functionGroup.openBlackCover();
                    //绑定black_cover的点击事件
                    functionGroup.blackCoverBindClick( function() {
                        functionGroup.closeSideMenu();
                        functionGroup.closeBlackCover();
                    });
                }
            }
        });
        //侧边固定栏
        var menu = Vue.extend({
            template : '<div ' +
                '           class="user-menu" ' +
                '           id="user-menu"' +
                '           :style="{left: css.left + \'px\' , width: css.width + \'px\' }"' +
                '       >' +
                '           <div ' +
                '               class="menu-user-block" ' +
                '               id="menu-user-block"' +
                '               style="height:'+menuUserBlockHeight+'px;"' +
                '           >' +
                '               <div ' +
                '                   class="menu-user-block-avatar" ' +
                '                   id="menu-user-block-avatar"' +
                '                   style="width:'+menuUserBlockAvatarSize+'px;height:'+menuUserBlockAvatarSize+'px;"' +
                '               >' +
                '                   <img ' +
                '                       id="menu-user-block-avatar-img" ' +
                '                       class="menu-user-block-avatar-img" ' +
                '                       :src="user.avatar"' +
                '                       style="width: '+menuUserBlockAvatarSize+'px;"' +
                '                   >' +
                '               </div>' +
                '               <div class="menu-user-block-uid" id="menu-user-block-uid">' +
                '                   <div class="menu-user-block-uid-txt" id="menu-user-block-uid-txt">' +
                '                       |uid : {{user.user_uid}}' +
                '                   </div>' +
                '               </div>' +
                '               <div class="menu-user-block-id" id="menu-user-block-id">' +
                '                   <div class="menu-user-block-id-txt" id="menu-user-block-id-txt" v-on="{click: !user.online && goToLogin}">' +
                '                       |id : {{user.user_id}}' +
                '                   </div>' +
                '               </div>' +
                '           </div>' +
                '           <hr class="menu-user-block-div-line">' +
                '           <div class="menu-func" id="menu-func">' +
                '               <ul class="menu-func-ul" id="menu-func-ul">' +
                '                   <li v-for="dep in func">' +
                '                       <div class="menu-func-li-btn-block" @click="functionSwitch(dep.func)">' +
                '                           <div class="menu-func-li-btn-block-txt">{{dep.name}}</div>' +
                '                           <div class="menu-func-li-btn-block-about">{{dep.about}}</div>' +
                '                       </div>' +
                '                   </li>' +
                '               </ul>' +
                '           </div>' +
                '       </div>',
            data : function() {
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
                            name: '更新日志',
                            about: '估计你对这个没啥兴趣',
                            func: 'updateLog'
                        },
                        {
                            name: '注销',
                            about: '嘤嘤嘤咱要溜了',
                            func: 'logOff'
                        }
                    ],
                    //用户数据
                    user: static_data.baseinfo.m_DEFAULT_USER_INFO,
                    //侧边菜单栏的css参数
                    css : {
                        left : menuLeft,
                        width : menuWidth
                    }
                }
            },
            methods : {
                goToLogin : function () {
                    functionGroup.goToLogin();
                },
                //点击这个dom的时候的函数处理事件，使用一个function和多个key来判断不同情况下执行什么任务
                functionSwitch : function(key)
                {
                    switch(key)
                    {
                        case 'index':
                            functionGroup.goToIndex();
                            break;
                        case 'myIndex':
                            functionGroup.goToMyIndex();
                            break;
                        case 'updateLog':
                            functionGroup.closeBlackCover();
                            functionGroup.closeSideMenu();
                            functionGroup.goToUpdateLog();
                            break;
                        case 'logOff':
                            functionGroup.logOff();
                            break;
                        case 'send':
                            functionGroup.goToSendPost();
                            break;
                    }
                }
            }
        });
        //黑色幕布固定栏
        //很蛋疼的是z-index中间的-号会被vue解析掉，所以绑定不了z-index元素
        var black_cover = Vue.extend({
            template : '<div ' +
                '           class="black-cover" ' +
                '           id="black-cover"' +
                '           :style="{opacity: css.opacity}"' +
                '           @click=mouseClick' +
                '       >' +
                '       </div>',
            data : function () {
                return {
                    css:{
                        opacity : 0
                    },
                    //函数绑定缓存，储存多组json格式的数据，对应法则为
                    //{ func: 目标函数 , isConst: 是否在执行完一次函数之后清除本元素}
                    //func定义为事件，最终储存在bindCache中的事件集合定义为事件列表
                    //isConst定义为固定事件标识符，如果这个事件是一个在运行完之后不从事件列表中删去的事件，则其为固定事件
                    bindCache : [
                        {
                            //默认事件，点击事件产生时发出一个提示
                            func: function(){
                                console.log('Event : click #black_cover');
                            },
                            //这个事件是默认的固定事件
                            isConst : true
                        }
                    ]
                }
            },
            methods : {
                //点击黑幕时处理掉绑定在黑幕的onlick事件（依此调用加清空不必要的函数缓存）
                mouseClick : function () {
                    for(var dep in this.bindCache){
                        this.bindCache[dep].func();
                    }
                    this.unbind();
                },
                //清理函数缓存，留下固定事件，删去非固定事件
                unbind : function() {
                    var bindCache_buf = [];
                    for(var dep in this.bindCache){
                        if(dep.isConst){
                            bindCache_buf.push(this.bindCache[dep]);
                        }
                    }
                    this.bindCache = bindCache_buf;
                },
                //添加函数缓存
                //参数为一个字典，或者为一个函数，固定事件表示默认为false
                bind : function(src) {
                    var type = typeof src;
                    //如果传进来的是一个对象（字典）
                    if(type === 'object'){
                        //判断其类型是否为我们所需要的类型
                        if(typeof src.func === 'function' && (typeof src.isConst === 'undefined' || typeof src.isConst ==='boolean')){
                            //利用三段运算符给isConst一个默认值（Js不支持直接的默认值真的很蛋疼）
                            src.isConst = src.isConst ? src.isConst : false;
                            this.bindCache.push(src);
                        }else{
                            console.error('Wrong type in function-bind');
                        }
                    //如果传入的是一个函数
                    }else if(type === 'function'){
                        //手动构建一个对象push进cache
                        this.bindCache.push({
                            func : src,
                            isConst : false
                        });
                    }else{
                        console.error('Wrong type in function-bind');
                    }
                }
            }
        });
        //底部固定栏
        var footer = Vue.extend({
            template : '<div class="footer" id="footer">'+static_data.baseinfo.m_COPYRIGHT+'</div>',
            data : function(){
                return {

                }
            },
            methods : {

            }
        });

        //实例化Vue对象
        this.header = new header();
        this.menu = new menu();
        this.black_cover = new black_cover();
        this.footer = new footer();

        //挂载Vue对象
        this.header.$mount('#_header');
        this.menu.$mount('#_menu');
        this.black_cover.$mount('#_black_cover');
        this.footer.$mount('#_footer');
    }

}

function pisert()
{
    return [
        Date.parse(new Date()) ,
        Math.floor(Math.random()*Math.pow(10,5))
    ];
}
