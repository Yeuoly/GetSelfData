function InitWeb()
{
    //提供一个给子级对象访问父级的handle
    var app_self = this;

    //函数集合，为了方便调用就把它们封装在一个去全局对象内了
    //所有函数完全独立，已避免互相调用
    var functionGroup = {
        //打开黑幕，关闭黑屋需要手动调用closeBlackCover，或者给黑幕绑定上点击黑幕就关闭的事件
        openBlackCover : function () {
            var black_cover = $("#black-cover");
            black_cover.css('z-index',1);
            var timer = setInterval(function () {
                var opacity = parseFloat(black_cover.css('opacity'));
                black_cover.css('opacity',opacity + 0.02);
                if(opacity >= static_data.userblock.m_MAX_BLACK_COVER_OPACITY - 0.02)
                {
                    clearInterval(timer);
                }
            },3);
        },
        //关掉黑幕，并移除黑幕的所有绑定事件
        closeBlackCover : function () {
            var black_cover = $("#black-cover");
            var timer_cover = setInterval(function () {
                var opacity = parseFloat(black_cover.css("opacity"));
                black_cover.css("opacity",(opacity - 0.02));
                if(opacity <= static_data.userblock.m_MIN_BLACK_COVER_OPACITY + 0.02)
                {
                    black_cover.css("z-index",-1);
                    clearInterval(timer_cover);
                }
            } , 3);
            black_cover.unbind('click');
        },
        //打开侧边栏
        openSideMenu : function () {
            var menu = $("#user-menu");
            var timer = setInterval(function () {
                var left = menu.offset().left;
                menu.css("left",left + 10);
                var left_max = static_data.userblock.m_MAX_MENU_LEFT - 20;
                if(left >= left_max)
                {
                    clearInterval(timer);
                    menu.css("box-shadow","2px 0px 1px rgb(173, 150, 150)");
                    menu.css('left',0);
                }
            },3);
        },
        //关掉侧边栏
        closeSideMenu : function () {
            var menu = $("#user-menu");
            menu.css("box-shadow","0px 0px 0px rgb(173, 150, 150)");
            var menu_width = menu.width();
            var timer_menu = setInterval(function () {
                var left = menu.offset().left;
                var right = left + menu_width;
                if(right <= 0)
                {
                    clearInterval(timer_menu);
                    return;
                }
                menu.css("left", left - 10);
            } , 3);
        },
        //到自己的主页去
        goToMyIndex : function () {
            location.href = static_data.getUrlPath("msg.html",static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //移动到更新日志
        goToUpdateLog : function () {
            location.href = static_data.getUrlPath('#updates-log-list',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //跳转页面到登录界面
        goToLogin : function () {
            location.href = static_data.getUrlPath('passport.html',static_data.m_URL_DOMAIN_WEB_DIR);
        },
        //注销
        logOff : function () {
            if(app_self.menu_user_block._data.user.online)
            {
                $.ajax({
                    url : static_data.getUrlPath("LogOff.php",static_data.m_URL_DOMAIN_API_DIR),
                    async : true,
                    type : "post",
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    xhrFields: {
                        withCredentials: true
                    },
                    success : function(data)
                    {
                        if(data['data']['res'] == true)
                        {
                            location.href = static_data.getUrlPath("",static_data.m_URL_DOMAIN_WEB_DIR);
                        }
                    }
                });
            }
        },
        //设置用户信息，键值与值相对应
        setUserInfo : function (key, val) {
            app_self.app.menu_user_block._data.user[key] = val;
        },
        //设置用户信息，传入值为一个数组，键值与值相对应
        setUserInfoArray : function (ary) {
            for(var key in ary){
                app_self.app.setUserInfo(key,ary[key]);
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
                    if(data['data']['res'] == static_data.response.passjct.success)
                    {
                        self.setUserInfoArray(data['data']['data']);
                        self.setUserInfo('online',true);
                        var handle_user_id_txt = $("#menu-user-block-id-txt");
                        handle_user_id_txt.css('cursor','default');
                    }
                }
            });
        },
        //获取用户信息
        getUserInfo : function () {
            return app_self.app.menu_user_block._data.user;
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
        }
    };

    //给外部访问函数集合的接口
    this.functionGroup = functionGroup;

    //创建dom
    createDom();

    //设置标题
    setTitle();

    //创建Vue对象进行数据绑定
    this.app = new BarContent();

    //检测用户登录情况
    functionGroup.passJct();

    //Vue对象集合
    function BarContent(){
        this.user_block_btn = new Vue({
            el : '#user-block-open',
            methods : {
                mouseClick : function() {
                    functionGroup.openSideMenu();
                    functionGroup.openBlackCover();
                    $('#black-cover').bind('click',function() {
                        app_self.functionGroup.closeSideMenu();
                        app_self.functionGroup.closeBlackCover();
                    });
                }
            }
        });

        //右侧功能侧栏(用户信息、登录等)
        this.menu_func = new Vue({
            el : '#menu-func',
            data : {
                func : [
                    {
                        name : '我的主页',
                        about : '字面意思呀，巴拉拉能量让你回到自己的主页！',
                        func : function (){
                            functionGroup.goToMyIndex();
                        }
                    },
                    {
                        name : '更新日志',
                        about : '估计你对这个没啥兴趣',
                        func : function () {
                            functionGroup.closeSideMenu();
                            functionGroup.closeBlackCover();
                            functionGroup.goToUpdateLog();
                        }
                    },
                    {
                        name : '注销',
                        about : '嘤嘤嘤咱要溜了',
                        func : function () {
                            functionGroup.logOff();
                        }
                    }
                ]
            }
        });

        //侧边栏用户菜单
        this.menu_user_block = new Vue({
            el : '#menu-user-block',
            data : {
                user : {
                    user_id     : '未登录，点击登录',
                    user_uid    : '-1',
                    user_email  : 'example@google.com',
                    user_lv     : '0',
                    user_exp    : '0',
                    user_class  : '',
                    avatar      : 'http://hbimg.b0.upaiyun.com/a12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658',
                    srm_jct     : '',
                    login_time  : '0',
                    online      : false
                }
            },
            methods : {
                goToLogin : function () {
                    functionGroup.goToLogin();
                }
            }
        });
    }

    //创建侧边栏和顶层的dom对象，并赋予类名和id以及innerHtml
    function createDom() {
        //获取app
        var map = $("#app");
        //顶部菜单栏
        var header = functionGroup.cDom(
            'div',
            'header',
            'header'
        );
        //侧边栏弹出来的时候用于把主界面亮度调低的黑色幕布
        var black_cover = functionGroup.cDom(
            'div',
            'black-cover',
            'black-cover'
        );
        //侧边栏
        var menu = functionGroup.cDom(
            'div',
            'user-menu',
            'user-menu'
        );
        //在顶部打开侧边栏的按钮
        var user_block_open = functionGroup.cDom(
            'div',
            'user-block-open',
            'user-block-open'
        );
        //在顶部打开侧边栏的按钮的主体
        var user_block_open_click = functionGroup.cDom(
            'div',
            'user-block-open-click',
            'user-block-open-click',
            '≡≡'
        );
        //底部
        var footer = functionGroup.cDom(
            'div',
            'footer',
            'footer',
            static_data.baseinfo.m_COPYRIGHT
        );
        //侧边栏的用户区域
        var menu_user_block = functionGroup.cDom(
            'div',
            'menu-user-block',
            'menu-user-block'
        );
        //侧边栏的上下分割线
        var menu_user_block_div_line = functionGroup.cDom(
            'hr',
            'menu-user-block-div-line'
        );
        //侧边栏用户区域的头像区域
        var menu_user_block_avatar = functionGroup.cDom(
            'div',
            'menu-user-block-avatar',
            'menu-user-block-avatar'
        );
        //侧边栏用户区域的头像区域头像的img标签
        var menu_user_block_avatar_img = functionGroup.cDom(
            'img',
            'menu-user-block-avatar-img',
            'menu-user-block-avatar-img'
        );
        //侧边栏用户区域的id
        var menu_user_block_id = functionGroup.cDom(
            'div',
            'menu-user-block-id',
            'menu-user-block-id'
        );
        //侧边栏用户区域的uid
        var menu_user_block_uid = functionGroup.cDom(
            'div',
            'menu-user-block-uid',
            'menu-user-block-uid'
        );
        //侧边栏用户区域的id文本主体
        var menu_user_block_id_txt = functionGroup.cDom(
            'div',
            'menu-user-block-id-txt',
            'menu-user-block-id-txt',
            '|{{user.user_id}}'
        );
        //侧边栏用户区域的uid文本主体
        var menu_user_block_uid_txt = functionGroup.cDom(
            'div',
            'menu-user-block-uid-txt',
            'menu-user-block-uid-txt',
            '|uid:{{user.user_uid}}'
        );
        //侧边栏的功能区域（一个菜单，包含了侧边栏的所有按钮
        var menu_func = functionGroup.cDom(
            'div',
            'menu-func',
            'menu-func'
        );
        //侧边栏功能区域的列表ul标签
        var menu_func_ul = functionGroup.cDom(
            'ul',
            'menu-func-ul',
            'menu-func-ul'
        );
        //侧边栏功能区域的列表li标签
        var menu_func_li = functionGroup.cDom(
            'li'
        );
        //侧边栏每个功能的区域
        var menu_func_li_btn_block = functionGroup.cDom(
            'div',
            'menu-func-li-btn-block',
            ''
        );
        //侧边栏每个功能的文本主体
        var menu_func_li_btn_block_txt = functionGroup.cDom(
            'div',
            'menu-func-li-btn-block-txt',
            '',
            '{{el.name}}'
        );
        var menu_func_li_btn_block_about = functionGroup.cDom(
            'div',
            'menu-func-li-btn-block-about',
            '',
            '{{el.about}}'
        );

        //Vue绑定事件与变量
        menu_user_block_avatar_img.attr(':src','user.avatar');
        user_block_open_click.attr('v-on:click','mouseClick');
        black_cover.attr('v-on:click','mouseClick');
        //不知道为什么可以这么写（迷），也不知道为什么把v-on换成v-on:click之后这个就不起作用了，
        //还不知道为什么这样子!user.online为false的时候会报错
        menu_user_block_id_txt.attr('v-on','{click: !user.online && goToLogin}');
        menu_func_li.attr('v-for','el in func');
        //不知道为什么当把v-on:click换成@click之后就会报错
        menu_func_li_btn_block.attr('v-on:click','el.func');

        //修整PC与PE的侧边栏宽度
        if(!functionGroup.isPC())
        {
            menu.width('70%');
            menu.css('left','-70%');
            menu_user_block.height(innerWidth * 0.12);
            menu_user_block_id_txt.css('font-size',innerWidth * 0.03 + "px");
            menu_user_block_uid_txt.css('font-size',innerWidth * 0.03 + "px");
            menu_user_block_avatar.width(innerWidth * 0.7 * 0.15);
        }else{
            menu_user_block_avatar.width(45);
            menu_user_block.height(innerWidth * 0.045);
        }
        menu_user_block_avatar_img.width(menu_user_block_avatar.width());
        menu_user_block_avatar_img.height(menu_user_block_avatar_img.width());
        menu_user_block_avatar.height(menu_user_block_avatar.width());

        //向html中添加dom
        //结构：
        //<menu>                                1
        //  <user-block>                        2
        //      <avatar>                        3
        //      <uid>                           4
        //      <id>                            5
        //  </user-block>                       6
        //  <div line>                          7
        //  <func>                              8
        //      <ul>                            9
        //          <li>                        10
        //              <each func>             11
        //          </li>                       12
        //      </ul>                           13
        //  </func>                             14
        //</menu>                               15
        menu.append(menu_user_block);                                   //2
        menu.append(menu_user_block_div_line);                          //7
        menu.append(menu_func);                                         //8
        menu_func.append(menu_func_ul);                                 //9
        menu_func_ul.append(menu_func_li);                              //10
        menu_func_li.append(menu_func_li_btn_block);                    //11
        menu_func_li_btn_block.append(menu_func_li_btn_block_txt);      //11-功能的文本主体
        menu_func_li_btn_block.append(menu_func_li_btn_block_about);    //11-功能介绍
        menu_user_block.append(menu_user_block_avatar);                 //3
        menu_user_block.append(menu_user_block_uid);                    //4
        menu_user_block.append(menu_user_block_id);                     //5
        menu_user_block_id.append(menu_user_block_id_txt);              //5-用户的id的文本主体
        menu_user_block_uid.append(menu_user_block_uid_txt);            //6-用户的uid的文本主体
        menu_user_block_avatar.append(menu_user_block_avatar_img);      //3-用户的头像的图片主体
        map.prepend(header);
        map.prepend(black_cover);
        map.prepend(menu);
        map.append(footer);
        header.append(user_block_open);
        user_block_open.append(user_block_open_click);
    }

    //设置标题
    function setTitle(){
        document.title = static_data.getWebTitle();
    }
}

function updateUserInfo(user_info)
{

}

function getDestinationCookie(cookieName) 
{
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++)
    {
        var arr = arrCookie[i].split("=");
        if(cookieName === arr[0])return arr[1];
    }
    return false;
}

function pisert()
{
    return [ Date.parse(new Date()) , Math.floor(Math.random()*Math.pow(10,5))];
}
