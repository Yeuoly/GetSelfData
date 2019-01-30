function InitWeb()
{

    this.cDom = function(type,className,id,innerHtml){
        var v = $("<" + type + ">");
        if(className != null)
            v.attr('class',className);
        if(id != null)
            v.attr('id',id);
        if(innerHtml != null)
            v.html(innerHtml);
        return v;
    };

    this.isPC = function()
    {
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
    };

    //创建侧边栏和顶层的dom对象，并赋予类名和id以及innerHtml
    document.title = static_data.getWebTitle();
    var map = $("#app");
    //顶部菜单栏
    var header = this.cDom(
        'div',
        'header',
        'header'
    );
    //侧边栏弹出来的时候用于把主界面亮度调低的黑色幕布
    var black_cover = this.cDom(
        'div',
        'black-cover',
        'black-cover'
    );
    //侧边栏
    var menu = this.cDom(
        'div',
        'user-menu',
        'user-menu'
    );
    //在顶部打开侧边栏的按钮
    var user_block_open = this.cDom(
        'div',
        'user-block-open',
        'user-block-open'
    );
    //在顶部打开侧边栏的按钮的主体
    var user_block_open_click = this.cDom(
        'div',
        'user-block-open-click',
        'user-block-open-click',
        '≡≡'
    );
    //底部
    var footer = this.cDom(
        'div',
        'footer',
        'footer',
        static_data.baseinfo.m_COPYRIGHT
    );
    //侧边栏的用户区域
    var menu_user_block = this.cDom(
        'div',
        'menu-user-block',
        'menu-user-block'
    );
    //侧边栏的上下分割线
    var menu_user_block_div_line = this.cDom(
        'hr',
        'menu-user-block-div-line'
    );
    //侧边栏用户区域的头像区域
    var menu_user_block_avatar = this.cDom(
        'div',
        'menu-user-block-avatar',
        'menu-user-block-avatar'
    );
    //侧边栏用户区域的头像区域头像的img标签
    var menu_user_block_avatar_img = this.cDom(
        'img',
        'menu-user-block-avatar-img',
        'menu-user-block-avatar-img'
    );
    //侧边栏用户区域的id
    var menu_user_block_id = this.cDom(
        'div',
        'menu-user-block-id',
        'menu-user-block-id'
    );
    //侧边栏用户区域的uid
    var menu_user_block_uid = this.cDom(
        'div',
        'menu-user-block-uid',
        'menu-user-block-uid'
    );
    //侧边栏用户区域的id文本主体
    var menu_user_block_id_txt = this.cDom(
        'div',
        'menu-user-block-id-txt',
        'menu-user-block-id-txt',
        '|{{user.user_id}}'
    );
    //侧边栏用户区域的uid文本主体
    var menu_user_block_uid_txt = this.cDom(
        'div',
        'menu-user-block-uid-txt',
        'menu-user-block-uid-txt',
        '|uid:{{user.user_uid}}'
    );
    //侧边栏的功能区域（一个菜单，包含了侧边栏的所有按钮
    var menu_func = this.cDom(
        'div',
        'menu-func',
        'menu-func'
    );
    //侧边栏功能区域的列表ul标签
    var menu_func_ul = this.cDom(
        'ul',
        'menu-func-ul',
        'menu-func-ul'
    );
    //侧边栏功能区域的列表li标签
    var menu_func_li = this.cDom(
        'li'
    );
    //侧边栏每个功能的区域
    var menu_func_li_btn_block = this.cDom(
        'div',
        'menu-func-li-btn-block',
        ''
    );
    //侧边栏每个功能的文本主体
    var menu_func_li_btn_block_txt = this.cDom(
        'div',
        'menu-func-li-btn-block-txt',
        '',
        '{{el.name}}'
    );

    //Vue绑定事件与变量
    menu_user_block_avatar_img.attr(':src','user.avatar');
    user_block_open_click.attr('v-on','{click: mouseClick,mouseenter: mouseOver,mouseleave: mouseLeave}');
    black_cover.attr('v-on:click','mouseClick');
    //不知道为什么可以这么写（迷），也不知道为什么把v-on换成v-on:click之后这个就不起作用了，
    //还不知道为什么这样子!user.online为false的时候会报错
    menu_user_block_id_txt.attr('v-on','{click: !user.online && goToLogin}');
    menu_func_li.attr('v-for','el in func');
    //不知道为什么当把v-on:click换成@click之后就会报错
    menu_func_li_btn_block.attr('v-on:click','el.func');

    //修整PC与PE的侧边栏宽度
    if(!this.isPC())
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

    //创建Vue对象进行数据绑定
    this.app = new BarContent();
    //检测用户登录情况
    this.app.passJct();

    function BarContent(){
        this.user_block_btn = new Vue({
            el : '#user-block-open',
            methods : {
            $g : function(id){
                return document.getElementById(id);
                },
                mouseOver : function () {
                    this.$g('user-block-open-click').style.backgroundColor = '#FF7E7E';
                },
                mouseLeave : function () {
                    this.$g('user-block-open-click').style.backgroundColor = '#FB8D8D';
                },
                mouseClick : function() {
                    var menu = $("#user-menu");
                    var black_cover = $("#black-cover");
                    var timer = setInterval(function () {
                        var left = menu.offset().left;
                        menu.css("left",left + 10);
                        var left_max = static_data.userblock.m_MAX_MENU_LEFT - 20;
                        if(left >= left_max)
                        {
                            clearInterval(timer);
                            menu.css("box-shadow","2px 0px 1px rgb(173, 150, 150)");
                            black_cover.css("z-index",1);
                            timer = setInterval(function () {
                                var opacity = parseFloat(black_cover.css("opacity"));
                                black_cover.css("opacity",opacity + 0.02);
                                if(opacity >= static_data.userblock.m_MAX_BLACK_COVER_OPACITY - 0.02)
                                {
                                    clearInterval(timer);
                                }
                            },3);
                        }
                    },3);
                }
            }
        });
        //遮罩层黑布
        this.black_cover = new Vue({
            el : '#black-cover',
            methods : {
                mouseClick : function() {
                    var menu = $("#user-menu");
                    var black_cover = $("#black-cover");
                    menu.css("box-shadow","0px 0px 0px rgb(173, 150, 150)");
                    var menu_width = menu.width();
                    var timer_menu = setInterval(function () {
                        var left = menu.offset().left;
                        var right = left + menu_width;
                        menu.css("left", left- 10);
                        if(right <= 0)
                        {
                            clearInterval(timer_menu);
                        }
                    } , 3);
                    var timer_cover = setInterval(function () {
                        var opacity = parseFloat(black_cover.css("opacity"));
                        black_cover.css("opacity",(opacity - 0.02));
                        if(opacity <= static_data.userblock.m_MIN_BLACK_COVER_OPACITY + 0.02)
                        {
                            black_cover.css("z-index",-1);
                            clearInterval(timer_cover);
                        }
                    } , 3);
                }
            }
        });

        //提供一个给子级对象访问父级的handle
        var app_self = this;

        //设置用户信息，键值与值相对应
        this.setUserInfo = function (key, val) {
            this.menu_user_block._data.user[key] = val;
        };

        //设置用户信息，传入值为一个数组，键值与值相对应
        this.setUserInfoArray = function (ary) {
            for(var key in ary){
                this.setUserInfo(key,ary[key]);
            }
        };

        this.passJct = function()
        {
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
        };

        //获取用户信息
        this.getUserInfo = function () {
            return this.menu_user_block._data.user;
        };
        //右侧功能侧栏(用户信息、登录等)
        this.menu_func = new Vue({
            parentHandle : app_self,
            el : '#menu-func',
            data : {
                func : [
                    {
                        name : '我的主页',
                        func : function (){
                            location.href = static_data.getUrlPath("msg.html",static_data.m_URL_DOMAIN_WEB_DIR);
                        }
                    },
                    {
                        name : '注销',
                        func : function () {
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
                        }
                    }
                ]
            }
        });

        this.menu_user_block = new Vue({
            parentHandle : app_self,
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
                    location.href = static_data.getUrlPath('passport.html',static_data.m_URL_DOMAIN_WEB_DIR);
                }
            }
        });
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
        if(cookieName == arr[0])return arr[1];
    }
    return false;
}

function pisert()
{
    return [ Date.parse(new Date()) , Math.floor(Math.random()*Math.pow(10,5))];
}