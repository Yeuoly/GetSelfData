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

//连接数据库
$con = mysqli_connect(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD);
if(!$con)
{
    exit('failed to connect to mysql');
}
if(!mysqli_select_db($con,MYSQL_DBNAME))
{
    exit('failed to connect to database');
}

//创建hash列表
$sql_head = "CREATE TABLE `manausr`.`hash_data_";

$sql_tail = "`  (
   `title` varchar(128) NULL,
  `about` varchar(1024) NULL,
  `userID` varchar(16) NULL,
  `userUID` int(0) NULL,
  `postID` varchar(32) NULL,
  `data` varchar(1024) NULL,
  `isOver` varchar(32) NULL
);";

for($i=97; $i<=122; $i++)
{
    $list_sign = chr($i);

    if(!mysqli_query($con,$sql_head.$list_sign.$sql_tail))
    {
        echo('failed to create user list');
    }
}

for($i=0; $i<=9; $i++)
{
    $list_sign = $i;

    if(!mysqli_query($con,$sql_head.$list_sign.$sql_tail))
    {
        echo('failed to create user list');
    }
}

echo 'Success';