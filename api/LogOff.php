<?php
    /**
     * Created by PhpStorm.
     * User: Administrator
     * Date: 2019/1/30
     * Time: 16:32
     */

    include_once (dirname(__FILE__) . "/Config.php");
    include_once (FILEPATH . "/utils/functions.php");

    //获取要到达的下一个网页
    $next = @$_GET['next'];
    \NFG\InitCommunicate();

    if(isset($_SESSION[SESSION_USERDATA]))
        unset($_SESSION[SESSION_USERDATA]);
    if(isset($_COOKIE[COOKIE_SRM_JCT]))
        setcookie(COOKIE_SRM_JCT,"",time()-3600,"/");
    if(isset($next))
        header("location:$next");

    echo json_encode(array(
        'msg' => SUCCESS,
        'data' => array(
            'res' => SUCCESS
        )
    ),JSON_UNESCAPED_UNICODE);