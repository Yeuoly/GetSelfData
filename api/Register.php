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


    /**祖传代码**/
/*
    $res = array(
        'msg' => 666,
        'data' => array(
            'error' => '',
            'res' => ''
        )
    );
    $register_current_time = time();
    if(!isset($_SESSION['register_email_code_email'])  || $_SESSION['register_email_code_time'] + 600 < time()){
        $res['data']['res'] = constant('passport_register_failed');
        $res['data']['error'] = constant('passport_meaningless_try');           //防止某些人瞎鸡儿注册
    }elseif(!$account || !$password || !$rnd || !$tim || !($register_current_time >= $tim && $tim >= $register_current_time - 2)
    || !preg_match("/\b[a-zA-Z0-9\.]{6,16}\b/",$password) || !preg_match("/\b[a-zA-Z0-9\.]{6,16}\b/",$account)){
        $res['data']['res'] = constant('passport_register_failed');
        $res['data']['error'] = constant('passport_wronginfoformat');           //验证账号密码格式
    }elseif($_SESSION['register_email_code'] != $verification){
        $res['data']['res'] = constant('passport_register_failed');
        $res['data']['error'] = constant('passport_wrong_verification');        //验证邮箱验证码
        echo $verification." ".$_SESSION["register_email_code"];
    }else{
        $usr_list = null; $con = null;$database = null;
        $mysqli_account_inserter = json_decode(constant('mysql_account_inserter'));
        if(!$con = mysqli_connect("127.0.0.1",$mysqli_account_inserter[0],$mysqli_account_inserter[1])){
            $res['data']['res'] = constant('passport_register_failed');
            $res['data']['error'] = constant('passport_server_error');                   //数据库出错
        }
        if(!$database = mysqli_select_db($con,constant('mysqli_db_manausr'))){
            $res['data']['res'] = constant('passport_register_failed');
            $res['data']['error'] = constant('passport_server_error');                   //数据库出错
        }
        elseif(!$usr_list = mysqli_query($con,"SELECT * FROM ".constant('mysql_list_usrs'))){
            $res['data']['res'] = constant('passport_register_failed');
            $res['data']['error'] = constant('passport_server_error');                   //数据库出错
        }else{
            $uid = 0;
            $account = SRMencode::encode($account,constant('offset_account'));
            $email   = SRMencode::encode($_SESSION['register_email_code_email'],constant('offset_email'));
            while($row = mysqli_fetch_array($usr_list)){
                $uid++;
                if($row['act'] == $account || $row['email'] == $_SESSION['register_email_code_email']){
                    $res['data']['res'] = constant('passport_register_failed');
                    $res['data']['error'] = constant('passport_register_repeat_account&email'); //用户名或邮箱已被使用
                    $uid = 0;
                    break;
                }
            }
            if(!$uid){
                exit(json_encode($res));
            }else{
                $password = Encrypt(MakeEWord(MakeEArray($password)));
                $sql = "INSERT INTO ".constant('mysql_list_usrs')."
                       ( act,        pswd,      srm_jct,  uid,  register_time,          email) 
                VALUES ('$account','$password','default',$uid, $register_current_time,'$email')";
                //echo $sql;
                if(!mysqli_query($con,$sql)){
                    $res['data']['res'] = constant('passport_register_failed');
                    $res['data']['error'] = constant('passport_server_error');
                }else{
                    $res['data']['res'] = constant('passport_register_success');
                    unset($_SESSION['register_email_code']);
                    unset($_SESSION['register_email_code_email']);
                    unset($_SESSION['regsiter_email_code_time']);
                }
            }
        }
    }
    exit(json_encode($res));*/