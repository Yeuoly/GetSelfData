<?php
    /**
     * Created by PhpStorm.
     * User: Administrator
     * Date: 2019/1/30
     * Time: 16:32
     */

    include_once (dirname(__FILE__) . "/Config.php");
    include_once (FILEPATH . "/utils/functions.php");

    \NFG\InitCommunicate();

    if(isset($_SESSION[SESSION_USERDATA]))
        unset($_SESSION[SESSION_USERDATA]);
    if(isset($_COOKIE[COOKIE_SRM_JCT]))
        setcookie(COOKIE_SRM_JCT,"",time()-3600,"/");