<?php
    /*
     * 静态函数库
     * */


    namespace NFG;

    //设置回文的头部
    class HeaderSetting
    {
        static public function SetImagePng(){
            header("Content-Type:image/png;");
        }
        static public function SetTextJson(){
            header("Content-Type:text/json;");
        }
        static public function SetAllowCredentials(){
            header("Access-Control-Allow-Credentials:true;");
        }
        static public function SetCharset(){
            header("charset:utf-8;");
        }
    }

    function InitCommunicate()
    {
        include_once(dirname(__FILE__) . "/../Config.php");
        session_name(SESSIONID);
        session_start();
        srand(time());
    }
    /*
        * 加密
        * */
    function encode($src,$offset){
        include_once(dirname(__FILE__) . "/../Config.php");
        include_once(FILEPATH . "/utils/class/class.Encrypt.php");
        return \SRMEncode::encode($src, $offset);
    }

    /*
    * 解密
    * */
    function decode($src,$offset){
        include_once(dirname(__FILE__) . "/../Config.php");
        return \SRMEncode::decode($src,$offset);
    }
    /*
     * 获取一个没鸟用的随机字符串
     * */
    function getSrmJct($nSize=24){
        $sessionID = "";
        // Randomize
        mt_srand ((double) microtime() * 1000000);
        for ($i=1; $i<=$nSize; $i++) {
            $nRandom = mt_rand(1,30);
            if ($nRandom <= 10) {
                $sessionID .= rand(0,9);
            } else {
                $sessionID .= chr(mt_rand(97,122));
            }
        }
        return $sessionID;
    }

    /*
     * 密码hash加密
     * */
    function encryptPassword($source)
    {
        include_once(dirname(__FILE__) . "/../Config.php");
        return md5(md5(md5(
            "^".$source."^".PASSWORD_HASH_SALT."^".PASSWORD_HASH_256."^".PASSWORD_HASH_CONFIRM
            )));
    }

