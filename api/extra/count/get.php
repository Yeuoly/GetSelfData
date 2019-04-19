<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/4/5
 * Time: 21:19
 */

    $dir = dirname(__FILE__);

    include_once ($dir . "/../../utils/plusings/visit-counter/autoInclude.php");
    include_once ($dir . "/../../Config.php");
    include_once ($dir . "/../../utils/functions.php");
    include_once ($dir . "/../../utils/class/class.ResponseAjax.php");

    \NFG\HeaderSetting::SetAllowCredentials();
    \NFG\HeaderSetting::SetAllowOrigin();

    $res = new ResponseAjax();

    $data = (new VisitCounter(MYSQL_DB_HOST,MYSQL_DBNAME,MYSQL_USER,MYSQL_PASSWORD))->get(30);

    if(!$data)
        $res->set('res',FAILED , true);
    $res->set('data',$data);
    $res->output();