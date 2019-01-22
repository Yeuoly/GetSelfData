<?php
    /*
     * 静态函数库
     * */

    /*
     * 返回hash字符串
     * */

    namespace NFG{

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
            include_once(dirname(__FILE__) . "/../config.php");
            session_name(SessionID);
            session_start();
        }

        /*
         * 加密
         * */
        function encode($src,$offset){
            include_once(dirname(__FILE__) . "/../config.php");
            include_once (FilePath . "/utils/class/class.encryption.php");
            return \SRMEncode::encode($src,$offset);

        }

        /*
         * 解密
         * */
        function decode($src,$offset){
            include_once(dirname(__FILE__) . "/../config.php");
            return \SRMEncode::decode($src,$offset);
        }

        /*
         * 获取一个没鸟用的随机字符串
         * */
        function getSrmJct($nSize=24) {
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
            include_once(dirname(__FILE__) . "/../config.php");
            return md5(md5(md5(
                "^".$source."^".private_salt."^".private_hash256."^".private_confirmation
            )));
        }
    }