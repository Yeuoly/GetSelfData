<?php
    /**
     * Editor : SRM_XY Yeuoly
     * Version : 1.0.1-alpha
     *
     * */


    //引入类文件
    include_once(dirname(__FILE__) . "/Config.php");
    include_once(FILEPATH . "/utils/mailpack.php");
    include_once(FILEPATH . "/utils/functions.php");
    include_once(FILEPATH . "/utils/class/class.Encrypt.php");
    include_once(FILEPATH . "/utils/class/class.Verification.php");
    include_once(FILEPATH . "/utils/class/class.ResponseAjax.php");
    include_once(FILEPATH . "/utils/class/class.Account.php");
    include_once(FILEPATH . "/utils/class/class.Format.php");

    //服务端回文头部
    \NFG\HeaderSetting::SetCharset();
    \NFG\HeaderSetting::SetTextJson();
    \NFG\HeaderSetting::SetAllowCredentials();
    \NFG\HeaderSetting::SetAllowOrigin();

    //初始化Sessoion
    \NFG\InitCommunicate();

    $account = @$_POST['act'];
    $password = @$_POST['pswd'];
    $captcha = @$_POST['captcha'];

    //服务端回文
    $res = new ResponseAjax();

    //验证验证码格式
    $formater = new FormatChecker();
    if(!$formater->FromNormalNum($captcha))
    {
        $res->set('res',FAILED);
        $res->set('error',wrong_params,true);
    }

    $Captchater = new VerfiyEmail();
    $result = $Captchater->Verfiy('register',$captcha);     //验证邮箱验证码
    if(is_string($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result,true);
    }
    $email  = $Captchater->GetEmail();                              //获取邮箱地址
    if(!$email)
    {
        return passport_server_error;
    }
    $AccountActor = new AccountAction();
    $AccountActor->__init($account,$password)->__setEmail($email);
    //账号信息格式错误
    $result = $AccountActor->VerifyFormat();
    if(!$result)
    {
        $res->set('res',FAILED);
        $res->set('error',wrong_params,true);
    }

    $userdata = null;
    $result = $AccountActor->Register($userdata);

    //释放Seesion
    $Captchater->ReleaseEmail();

    //注册失败
    if(is_string($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result,true);
    }

    $res->set('res',SUCCESS);
    $res->set('data',$userdata,true);