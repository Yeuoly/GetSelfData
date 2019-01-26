<?php
    //引入登录类文件
    include_once(dirname(__FILE__) . "/Config.php");
    include_once (FILEPATH . "/utils/class/class.response_ajax.php");
    include_once(FILEPATH . "/utils/class/class.account.php");
    include_once (FILEPATH . "/utils/functions.php");

    //初始化sessoion及头部
    \NFG\InitCommunicate();
    \NFG\HeaderSetting::SetTextJson();
    \NFG\HeaderSetting::SetCharset();

    $act = @$_POST['act'];          //账号
    $pswd = @$_POST['pswd'];        //密码
    $tim = @$_POST['tim'];          //时间戳
    $rnd = @$_POST['rnd'];          //没鸟用的随机数

    $res = new ResponseAjax();      //输出结果

    //验证参数格式
    $LoginActor = (new AccountAction())->__init($act,$pswd,$tim,$rnd)->VerifyFormat();
    if(!$LoginActor)
    {
        $res->set('res',FAILED);
        $res->set('error',passport_wrong_format);
        $res->output(true);
    }
    //验证密码，初始化用户信息
    $user_data  = null;
    //验证密码
    $result_login = $LoginActor->Login($user_data);

    if($result_login != true || is_string($result_login))
    {
        $res->set('res',FAILED);
        $res->set('error',$result_login);
        $res->output(true);
    }
    $res->set('res',SUCCESS);
    $res->set('data',$user_data);
    setcookie("srm_jct",$user_data['srm_jct'],time()+COOKIE_SAVING_TIME,"/");
    $login_data = array(
        SESSION_SRM_JCT    => $user_data['srm_jct'],
        SESSION_LOGIN_TIME => time(),
        SESSION_USER_CLASS => 'none',
        SESSION_USER_ID    => $user_data['account'],
        SESSION_USER_EMAIL => $user_data['email']
    );
    $_SESSION[SESSION_USERDATA]    = $login_data;
    $res->output();