<?php
    /**
     *
     * 这个API用于检测账号是否存在
     *
     * */

    //初始化
    include_once(dirname(__FILE__) . "/../../Config.php");
    include_once(FILEPATH . "/utils/functions.php");
    include_once(FILEPATH . "/utils/class/class.Account.php");
    include_once(FILEPATH . "/utils/class/class.ResponseAjax.php");
    include_once(FILEPATH . "/utils/class/class.Format.php");

    //初始化API
    \NFG\InitCommunicate();
    \NFG\HeaderSetting::SetAllowOrigin();
    \NFG\HeaderSetting::SetTextJson();
    \NFG\HeaderSetting::SetCharset();
    \NFG\HeaderSetting::SetAllowCredentials();

    //初始化参数
    $userName = $_POST['n'];
    $res = new ResponseAjax();

    //验证参数格式
    $formater = new FormatChecker();
    if(!$formater->FromNormalStr($userName))
    {
        $res->set('res',FAILED);
        $res->set('error',passport_register_wrong_format,true);
    }else{
        $len = mb_strlen($userName);
        if($len > 16 || $len < 6)
        {
            $res->set('res',FAILED);
            $res->set('error',passport_register_wrong_format,true);
        }
    }

    $result =  AccountAction::FindUser($userName);
    if($result == -2)
    {
        $res->set('find',false,true);
    }elseif ($result == false){
        $res->set('res',FAILED);
        $res->set('error',server_error,true);
        var_dump($result);
    }else{
        $res->set('find',true,true);
    }