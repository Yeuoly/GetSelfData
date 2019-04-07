<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/4/7
 * Time: 15:33
 */

include_once (dirname(__FILE__) . "/../../Config.php");

include_once (FILEPATH . "/utils/plusings/visit-counter/autoInclude.php");

$p = new VisitCounter(MYSQL_DB_HOST,MYSQL_DBNAME,MYSQL_USER,MYSQL_PASSWORD);

$p->createCounterList();