function initWeb()
{
    function $c(div){
        return document.createElement(div);
    }

    function $g(id){
        return document.getElementById(id);
    }

    document.title = static_data.getWebTitle();
    var map = document.getElementById("map");
    var header = $c("div");
    var black_cover = $c("div");
    var menu = $c("div");
    var user_block_open = $c("div");
    var user_block_open_click = $c("div");
    var footer = $c("div");
    footer.id = "footer";
    footer.className = "footer";
    footer.innerHTML = "©2019 Yeuoly VSOV";
    user_block_open_click.id = "user-block-open-click";
    user_block_open_click.className = "user-block-open-click";
    user_block_open_click.innerHTML = "≡≡";
    user_block_open.className = "user-block-open";
    user_block_open_click.onclick = function() {
        var menu = $("#user-menu");
        var black_cover = $("#black-cover");
        var timer = setInterval(function () {
            var left = menu.offset().left;
            menu.css("left",left + 10);
            if(left >= static_data.userblock.m_MAX_MENU_LEFT - 10)
            {
                clearInterval(timer);
                black_cover.css("z-index",1);
                timer = setInterval(function () {
                    var opacity = black_cover.css("opacity");
                    black_cover.css("opacity",parseFloat(opacity) + 0.02);
                    if(opacity >= static_data.userblock.m_MAX_BLACK_COVER_OPACITY - 0.02)
                    {
                        clearInterval(timer);
                    }
                },5)
            }
        },5);
    };
    user_block_open_click.onmouseover = function(){
        $("#user-block-open-click").css("background-color","#FF7E7E");
    };
    user_block_open_click.onmouseleave = function(){
        $("#user-block-open-click").css("background-color","#FB8D8D");
    };
    user_block_open.id = "user-block-open";
    black_cover.className = "black-cover";
    black_cover.id = "black-cover";
    black_cover.onclick = function() {
        var menu = $("#user-menu");
        var black_cover = $("#black-cover");
        var timer_menu = setInterval(function () {
            var left = menu.offset().left;
            menu.css("left",left - 10);
            if(left <= static_data.userblock.m_MIN_MENU_LEFT + 10)
            {
                clearInterval(timer_menu);
            }
        });
        var timer_cover = setInterval(function () {
            var opacity = parseFloat(black_cover.css("opacity"));
            black_cover.css("opacity",(opacity - 0.02));
            if(opacity <= static_data.userblock.m_MIN_BLACK_COVER_OPACITY + 0.02)
            {
                black_cover.css("z-index",-1);
                clearInterval(timer_cover);
            }
        });
    };
    menu.id = "user-menu";
    header.className = "header";
    map.parentNode.insertBefore(header,map);
    map.parentNode.insertBefore(black_cover,map);
    map.parentNode.insertBefore(menu,map);
    document.body.appendChild(footer);
    header.appendChild(user_block_open);
    user_block_open.appendChild(user_block_open_click);
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

function checkStatue()
{
    var res = false;
    $.ajax({
        url : static_data.getUrlPath("User.php",static_data.m_URL_DOMAIN_API_DIR),
        async : false,
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

                res = true;
            }
        }
    })
    return res;
}

function pisert()
{
    return [ Date.parse(new Date()) , Math.floor(Math.random()*Math.pow(10,5))];
}
