<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/6
 * Time: 20:59
 */

include_once (dirname(__FILE__) . "/../../Config.php");
include_once (FILEPATH . "/utils/functions.php");

\NFG\HeaderSetting::SetAllowCredentials();
\NFG\HeaderSetting::SetAllowOrigin();
\NFG\HeaderSetting::SetTextJson();
\NFG\HeaderSetting::SetCharset();

/** 引入User.php验证用户身份 **/
include_once (FILEPATH . "/account/v1/User.php");

/**
 * 如果验证没通过，程序会直接停止
 * 引入用户操作类，初始化参数
 **/

$dest = $_POST['dest'];
$origin_value = @$_POST['ogv'] ? $_POST['ogv'] : 'default';
$modify_value = $_POST['myv'];

include_once (FILEPATH . "/utils/class/class.Account.php");
include_once (FILEPATH . "/utils/class/class.Format.php");

$fomater = new FormatChecker();
if(!$fomater->FromNormalStr($origin_value) || !$fomater->FromNormalStr($modify_value) || !$fomater->FromNormalStr($dest)){
    $res->set('res',FAILED);
    $res->set('error',user_action_wrong_format,true);
}

$accountActor = new AccountAction();
$result = $accountActor->updateUserInfo($dest,$modify_value,$origin_value);
if($accountActor->_is_failed($result)){
    $res->set('res',FAILED);
    $res->set('error',$result,true);
}
$res->output();