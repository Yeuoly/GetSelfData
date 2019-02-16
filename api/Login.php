<?php
    //引入登录类文件
    include_once(dirname(__FILE__) . "/Config.php");
    include_once(FILEPATH . "/utils/class/class.ResponseAjax.php");
    include_once(FILEPATH . "/utils/class/class.Account.php");
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
        $res->set('error',wrong_params);
        $res->output(true);
    }
    //验证密码，初始化用户信息
    $srm_jct  = null;
    //验证密码
    $result_login = $LoginActor->Login($srm_jct);

    if($result_login != true || is_string($result_login))
    {
        $res->set('res',FAILED);
        $res->set('error',$result_login);
        $res->output(true);
    }
    $res->set('res',SUCCESS);
    setcookie("srm_jct",$srm_jct,time()+COOKIE_SAVING_TIME,"/");
    $res->output();