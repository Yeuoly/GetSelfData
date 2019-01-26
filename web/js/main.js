function placeHeader()
{
    document.title = static_data.getWebTitle();
    var map = document.getElementById("map");
    var header = document.createElement("div");
    var header_statue = document.createElement("div");
    var header_passport = document.createElement("div");
    var header_passport_btn = document.createElement("button");
    header.className = "header";
    header_statue.className = "header-statue";
    header_statue.id        = "header-userid";
    header_statue.innerHTML = "离线";
    header_passport.className = "header-passport";
    header_passport_btn.innerHTML = "登录界面"
    header_passport_btn.id = "passport";
    map.parentNode.insertBefore(header,map);
    header.appendChild(header_statue);
    header.appendChild(header_passport);
    header_passport.appendChild(header_passport_btn);
    document.getElementById("passport").onclick = function()
    {
        location.href = static_data.getUrlPath("passport.html",static_data.m_URL_DOMAIN_WEB_DIR);
    }
}

function selectBackground()
{
    if(!isPC())$("#background").attr("src",static_data.getUrlPath("bg/bg2.jpg",static_data.m_URL_DOMAIN_IMG_DIR));
    else $("#background").attr("src",static_data.getUrlPath("bg/bg.jpg",static_data.m_URL_DOMAIN_IMG_DIR));
}

function setHeaderStatue(userid)
{
    $("#header-userid").text(static_data.getWelcomeSaying()+userid+"~");
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
        url : static_data.getUrlPath("passjct.php",static_data.m_URL_DOMAIN_API_DIR),
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
                setHeaderStatue(data['data']['data']['user_id']);
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