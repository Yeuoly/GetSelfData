<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/19
 * Time: 22:45
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

