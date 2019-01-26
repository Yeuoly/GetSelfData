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
    if(checkStatue() != true)
    {
        $("#sec_master").html("赶快登陆呐");
        $("#thr_master_1").css({"display":""});
    }
    else
    {
        $("#sec_master").html("您已经登录了哦~注册新账号咩~");
        $("#thr_master_2").css({"display":""});
    }

    var bcgd = this.document.createElement("img");
    bcgd.id = "background";
    this.document.body.parentNode.insertBefore(bcgd,this.document.body);
    selectBackground();
    $("#login_btn").click(function(){
        var account = $("#l-userid").val();
        var pswd    = $("#l-pswd").val();
        if(!(pswd+account).match(/\b[a-zA-Z0-9\.]{12,32}\b/))
        {
            $("#sec_master").html("密码或账号不符合规范");
            return;
        }
        verifyToken(account,pswd);
    });
    $("#go_register").click(function(){
        $("#sec_master").html("开启新世界的大门叭！");
        $("#thr_master_1").css({"display":"none"});
        $("#thr_master_2").css({"display":""});
    });
    $("#get_captcha_btn").click(function(){
        getCaptcha();
    });
    $("#get_email_captcha_btn").click(function(){
        var email = $("#r-email").val();
        var captcha = $("#r-captcha").val();
        if(!email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
            $("#sec_master").html("邮箱格式错误");
            return;
        }else if(!captcha.match(/\d+/)){
            $("#sec_master").html("验证码错误");
            return;
        }else{
            requestEmailVerification(email,captcha);
        }
    });
    $("#register_btn").click(function(){
        var account = $("#r-userid").val();
        var password = $("#r-pswd").val();
        var verification = $("#r-verification").val();
        if(!(account+account).match(/\b[a-zA-Z0-9\.]{12,32}\b/)){
            $("#sec_master").html("密码或账号不符合规范");
            return;
        }
        else if(!verification.match(/\d+/)){
            $("#sec_master").html("验证码错误");
            return;
        }
        regsiterMaster(account,password,verification);
    });
}

function verifyToken(account,password)
{
    var exr = pisert();
    $.ajax({
        url : static_data.getUrlPath("login.php",static_data.m_URL_DOMAIN_API_DIR),
        async : true,
        type : "post",
        data : {act : account , pswd : password , tim : exr[0]/1000 , rnd : exr[1]},
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
	    xhrFields: {
        	withCredentials: true
    	},
        success : function(data)
        {
            if(data['data']['res'] == static_data.response.login.failed)
                $("#sec_master").html((data['data']['error']));
            else if(data['data']['res'] == static_data.response.login.success)
                location.href = static_data.getUrlPath("",static_data.m_URL_DOMAIN_WEB_DIR);
        }
    });
}

function requestEmailVerification(email,captcha)
{
    $.ajax({
        url : static_data.getUrlPath("verification.php",static_data.m_URL_DOMAIN_API_DIR),
        async : true,
        type : "post",
        data : {email : email , method : 'register' , captcha : captcha},
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
	    xhrFields: {
        	withCredentials: true
    	},
        success : function(data)
        {
            if(data['data']['res'] == static_data.response.requestVerification.success)
                $("#sec_master").html(static_data.baseinfo.m_VERIFICATION_SUCCESS);
            else
                $("#sec_master").html(data['data']['error']);
        }
    });
}

function regsiterMaster(account,password,verification)
{
    var exr = pisert();
    $.ajax({
        url : static_data.getUrlPath("reg.php",static_data.m_URL_DOMAIN_API_DIR),
        async : true,
        type : "post",
        data : {act : account,pswd : password,captcha : verification , tim : exr[0]/1000 , rnd : exr[1]},
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
	    xhrFields: {
        	withCredentials: true
    	},
        success : function(data)
        {
            if(data['data']['res'] == static_data.response.register.failed)
                $("#sec_master").html(data['data']['error']);
            else
                location.href = static_data.getUrlPath("passport.html",static_data.m_URL_DOMAIN_WEB_DIR);
        }
    });
}

function getCaptcha()
{
    $("#register_captcha").attr("src",static_data.getUrlPath(
        "captcha.php?method=register",static_data.m_URL_DOMAIN_API_DIR)
    );
}