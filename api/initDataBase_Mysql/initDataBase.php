<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly SRM_XY
 * Date: 2019/2/2
 * Time: 22:47
 *
 * 就建立默认的数据库和默认的用户列表
 *
 */

include_once (dirname(__FILE__) . "/../Config.php");

//建立并连接数据库
$con = mysqli_connect(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD);
if(!$con)
{
    exit('failed to connect to mysql');
}
if(!mysqli_query($con,"CREATE DATABASE ".MYSQL_DBNAME))
{
    exit('failed to create database');
}
if(!mysqli_select_db($con,MYSQL_DBNAME))
{
    exit('failed to connect to database');
}

//创建用户列表
$sql = "CREATE TABLE `".MYSQL_DBNAME."`.`".MYSQL_USER_LIST."` ( `act` VARCHAR(255) NOT NULL , `pswd` VARCHAR(32) NOT NULL , `srm_jct` VARCHAR(32) NOT NULL , `uid` INT NOT NULL , `register_time` INT NOT NULL , `email` VARCHAR(64) NOT NULL , `login_time` INT NOT NULL , `class` TINYINT NOT NULL , `lv` TINYINT NOT NULL , `lv.exp` SMALLINT NOT NULL ) ENGINE = MyISAM;";
if(!mysqli_query($con,$sql))
{
    exit('failed to create user list');
}
echo 'Success';