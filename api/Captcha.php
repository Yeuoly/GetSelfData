<?php
    /*
     * 图片数学计算验证码
     * 直接输出图片
     *
     * */
    //引入类文件
    include_once(dirname(__FILE__) . "/Config.php");
    include_once (FILEPATH . "/utils/functions.php");
    include_once(FILEPATH . "/utils/class/class.Format.php");

    //初始化
    \NFG\HeaderSetting::SetAllowCredentials();
    \NFG\HeaderSetting::SetImagePng();
    \NFG\InitCommunicate();
    //此验证码所对应的验证目标（比如说“注册”，“登录”）
    $method = @$_GET['method'];
    $formater = new FormatChecker();
    //如果method格式错误就直接终止运行
    if(!$formater->FromMethod($method))exit;
    //引入验证类
    include_once(FILEPATH . "/utils/class/class.Verification.php");
    //生成输出验证码图片并保存验证码本体
    (new VerfiyMathCatpcha())
        ->CreateCaptcha()
        ->SaveCaptcha($method)
        ->Output()
        ->DestoryImage();