<?php
    /**
     * Editor : SRM_XY Yeuoly
     * Version : 1.0.1-alpha
     *
     * */
    include_once (dirname(__FILE__) . "/config.php");
    include_once (FilePath . "/utils/functions.php");
    include_once (FilePath . "/utils/class/class.verification.php");
    include_once (FilePath . "/utils/class/class.response_ajax.php");
    include_once (FilePath . "/utils/class/class.account.php");
    include_once (FilePath . "/utils/class/class.format.php");

    //设置头部
    \NFG\HeaderSetting::SetAllowCredentials();
    \NFG\HeaderSetting::SetTextJson();
    \NFG\HeaderSetting::SetCharset();

    //设置
    define("request_interval",60);
    define("verify_email_body","_email_captcha_");

    //初始化Session
    NFG\InitCommunicate();
    $res                = new ResponseAjax();           //服务端回文
    $formater           = new FormatChecker();          //检测参数格式
    $captchater_email   = new VerfiyEmail();            //邮箱验证
    $captchater_math    = new VerfiyMathCatpcha();      //普通验证

    //获取post参数
    $email = @$_POST['email'];
    $method = @$_POST['method'];
    $captcha = @$_POST['captcha'];

    //避免频繁请求
    if(isset($_SESSION[$method.verify_email_body.'time'])){
        if($_SESSION[$method.verify_email_body.'time'] + request_interval > time()){
            $res->set('res',send_mail_failed);
            $res->set('error',passport_verificate_tooquick,true);
        }
    }

    //验证参数格式
    if(!$formater->FromMethod($method) || !$formater->FromEmail($email) || !$formater->FromNormalNum($captcha))
    {
        $res->set('res',failed);
        $res->set('error',list_operate_wrongformat,true);
    }

    //验证常规验证码
    $result =  $captchater_math->Verfiy($method,$captcha);      //验证验证码
    if(is_string($result))
    {
        $res->set('res',failed);
        $res->set('error',$result,true);
    }

    $accountActor = new AccountAction();


    //构建消息
    $msg = "";
    switch($method){
        case 'register':
            $msg .= "欢迎注册YeuolyBlog~";
            break;
        default:
            $res->set('res',send_mail_failed);
            $res->set('error',passport_verificate_unknownmethod,true);
    }

    //发送邮箱验证码
    $result = $captchater_email
        ->__setEmail($email)
        ->CreateCaptcha()
        ->SaveCaptcha($method)
        ->SaveEmail()
        ->Send($msg);
    if($result != true)
    {
        $res->set('res',send_mail_failed);
        $res->set('error',send_mail_failed_servererror,true);
    }

    $_SESSION[$method.verify_email_body.'time'] = time();
    $_SESSION[$method.verify_email_body.'email'] = $email;
    $res->set('res',send_mail_success,true);

    //version 1.0.0-beta 作废代码
    /*
    if(!isset($_SESSION[$method."_captcha_code"])){
        $res->set('res',send_mail_failed);
        $res->set('error',passport_verification_nocaptcha);
    }
    elseif(!preg_match('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/',$email)){
        $res->set('res',send_mail_failed);
        $res->set('error',passport_verfication_wrongemailformat);
    }
    elseif(!$captcha || !is_string($captcha) ||$captcha != $_SESSION[$method."_captcha_code"]){
        $res->set('res',send_mail_failed);
        $res->set('error',wrong_captcha);
    }
    if($res['data']['res'] == constant('send_mail_failed')){
        $res->output(true);
    }
    unset($_SESSION[$method.'_captcha_code']);
    $verification_code = rand(233333,666666);
    $title = "NotForget验证码";
    $content = "欢迎使用NotForget信息系统！\n";
    switch($method){
        case 'register':
            $content .= "您的注册验证码为：".$verification_code."\n验证码10分钟内有效，请尽快完成注册。";
            break;
        default:
            $res['data']['res'] = constant('send_mail_failed');
            $res['data']['error'] = constant('passport_verificate_unknownmethod');
            exit(json_encode($res));
    }
    if(sendMail($reciever,$title,$content) != constant('send_mail_success')){
        $res['data']['res'] = constant('send_mail_failed');
        $res['data']['error'] = constant('send_mail_failed_servererror');
        exit(json_encode($res));
    }
    $_SESSION[$method.'_email_code'] = $verification_code;
    $_SESSION[$method.'_email_code_time'] = time();
    $_SESSION[$method.'_email_code_email'] = $reciever;
    $_SESSION['verification_time'] = time();
    $res['data']['res'] = constant('success');
    exit(json_encode($res));*/

