<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/2/10
     * Time: 21:23
     */

    include_once (dirname(__FILE__) . "/../Config.php");
    include_once(FILEPATH . "/utils/class/class.DBController.php");
    $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
    $DB->Start();

    echo '<pre>';
    for($i=97; $i<=122; $i++)
    {
        $list_sign = chr($i);
        echo 'hash_data_'.$list_sign.'--';
        var_dump($DB->GetWholeList('hash_data_'.$list_sign));
    }

    for($i=0; $i<=9; $i++)
    {
        $list_sign = $i;
        echo 'hash_data_'.$list_sign.'--';
        var_dump($DB->GetWholeList('hash_data_'.$list_sign));
    }
    echo '</pre>';