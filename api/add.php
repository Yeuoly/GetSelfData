<?php
    error_reporting(0);
    include("utils/functions.php");
    $carrier = @$_GET['carrier'];
    $main = @$_GET['main'];
    $usrinfo = GetLoginInfo();
    $password_confirmation = GetUsrPassword($usrinfo[0]);
    if($password_confirmation != $usrinfo[1] || $carrier =="" || $main == "")
        exit;
    AddUsrInfo($usrinfo[0],$carrier,$main);
    header("location:http://".$_SERVER['HTTP_HOST']."//website/pif_mana/");