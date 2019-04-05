<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly
     * Date: 2019/4/5
     * Time: 20:40
     */

    include_once (dirname(__FILE__) . "/../../utils/plusings/visit-counter/autoInclude.php");
    include_once (dirname(__FILE__) . "/../../Config.php");
    include_once (dirname(__FILE__) . "/../../utils/functions.php");

    \NFG\HeaderSetting::SetAllowOrigin();

    $p = new VisitCounter(MYSQL_DB_HOST,MYSQL_DBNAME,MYSQL_USER,MYSQL_PASSWORD);
    $p->count();