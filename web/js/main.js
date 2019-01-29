function InitWeb()
{
    //创建固定顶层和侧边应用栏
    document.title = static_data.getWebTitle();
    var map = $("#app");
    var header = $("<div>");
    var black_cover = $("<div>");
    var menu = $("<div>");
    var user_block_open = $("<div>");
    var user_block_open_click = $("<div>");
    var footer = $("<div>");
    var menu_user_block = $("<div>");
    var menu_user_block_avatar = $("<div>");
    var menu_user_block_avatar_img = $("<img>");
    var menu_user_block_id = $("<div>");
    var menu_user_block_uid = $("<div>");
    var menu_user_block_id_txt = $("<div>");
    var menu_user_block_uid_txt = $("<div>");
    menu_user_block.attr('class','menu-user-block');
    menu_user_block.attr('id','menu-user-block');
    menu_user_block_avatar.attr('class','menu-user-block-avatar');
    menu_user_block_avatar.attr('id','menu-user-block-avatar');
    menu_user_block_avatar_img.attr(':src','user.avatar');
    menu_user_block_avatar_img.attr('class','menu-user-block-avatar-img');
    menu_user_block_avatar_img.attr('class','menu-user-block-avatar-img');
    menu_user_block_id.attr('class','menu-user-block-id');
    menu_user_block_id.attr('id','menu-user-block-id');
    menu_user_block_uid.attr('class','menu-user-block-uid');
    menu_user_block_uid.attr('id','menu-user-block-uid');
    menu_user_block_id_txt.html('{{user.user_id}}');
    menu_user_block_id_txt.attr('class','menu-user-block-id-txt');
    menu_user_block_id_txt.attr('id','menu-user-block-id-txt');
    menu_user_block_uid_txt.html('{{user.user_uid}}');
    menu_user_block_uid_txt.attr('class','menu-user-block-uid-txt');
    menu_user_block_uid_txt.attr('id','menu-user-block-uid-txt');
    footer.attr('id','footer');
    footer.attr('class','footer');
    footer.html('© 2019 - Yeuoly')
    user_block_open_click.attr('id','user-block-open-click');
    user_block_open_click.attr('class','user-block-open-click');
    user_block_open_click.html('≡≡');
    user_block_open_click.attr('v-on','{click: mouseClick,mouseenter: mouseOver,mouseleave: mouseLeave}');
    user_block_open.attr('class','user-block-open');
    user_block_open.attr('id','user-block-open');
    black_cover.attr('class','black-cover');
    black_cover.attr('id','black-cover');
    black_cover.attr('v-on','{click: mouseClick}');
    menu.attr('id','user-menu');
    header.attr('class','header');
    menu.append(menu_user_block);
    menu_user_block.append(menu_user_block_avatar);
    menu_user_block.append(menu_user_block_id);
    menu_user_block_id.append(menu_user_block_id_txt);
    menu_user_block_uid.append(menu_user_block_uid_txt);
    menu_user_block.append(menu_user_block_uid);
    menu_user_block_avatar.append(menu_user_block_avatar_img);
    map.prepend(header);
    map.prepend(black_cover);
    map.prepend(menu);
    $("body").append(footer);
    header.append(user_block_open);
    user_block_open.append(user_block_open_click);

    //创建Vue对象进行数据绑定
    this.app = new BarContent();
    //检测用户登录情况
    this.app.passJct();

    function BarContent(){
        this.user_block_btn = new Vue({el : '#user-block-open',
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
                        if(left >= static_data.userblock.m_MAX_MENU_LEFT - 10)
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
                        var timer_menu = setInterval(function () {
                            var left = menu.offset().left;
                            menu.css("left",left - 10);
                            if(left <= static_data.userblock.m_MIN_MENU_LEFT + 10)
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
                    }
                }
            });
        };

        //获取用户信息
        this.getUserInfo = function () {
            return this.menu_user_block._data.user;
        };
        //右侧功能侧栏(用户信息、登录等)
        this.menu_user_block = new Vue({
            el : '#menu-user-block',
            data : {
                user : {
                    user_id     : '未登录',
                    user_uid    : '-1',
                    user_email  : 'example@google.com',
                    user_lv     : '0',
                    user_exp    : '0',
                    user_class  : '',
                    avatar      : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548761016131&di=d0e11734ff4ebbf2ed85bcfa80362007&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658',
                    srm_jct     : '',
                    login_time  : '0',
                    online      : false
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

function isPC() 
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
}

function pisert()
{
    return [ Date.parse(new Date()) , Math.floor(Math.random()*Math.pow(10,5))];
}