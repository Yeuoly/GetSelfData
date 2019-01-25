<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/1/12
     * Time: 15:53
     *
     * Version : 1.0.0-alpha
     *
     */

    /**
     * 用户操作类
     * */

    include_once (dirname(__FILE__)."/class.db_controller.php");
    include_once (dirname(__FILE__)."/class.format.php");
    include_once (dirname(__FILE__)."/class.encryption.php");
    include_once (dirname(__FILE__)."/../functions.php");
    include_once (dirname(__FILE__)."/../../config.php");

    define("mysql_key_password","pswd");
    define("mysql_key_jct","srm_jct");
    define("mysql_key_account","act");
    define("mysql_key_email","email");
    define("mysql_key_register_time","register_time");
    define("mysql_key_uid","uid");
    define("mysql_key_login_time","login_time");


    class AccountAction extends Base
    {
        private $account = "";
        private $password = "";
        private $email = "";
        private $time = 0;
        private $rnd = 0;

        /*
         * 初始化账号信息，并验证格式
         * 错误返回原因
         * 成功返回true
         **/
        public function __construct(){
            /*if(!$this->VerifyFormat($account,$password,$time,$rnd))
            {
                return passport_wrong_format;
            }
            */
            /* $this->password = $password;
            $this->account = $account;
            $this->time = $time;
            $this->rnd = $rnd;
            return $this;*/
        }

        public function __init($account = "",$password = "",$time = 0,$rnd = 0){
            $this->password = $password;
            $this->account = $account;
            $this->time = $time;
            $this->rnd = $rnd;
            return $this;
        }

        public function __setEmail($email){
            $this->email = $email;
            return $this;
        }

        /*
         * 返回一个用户的所有信息
         *
         * */
        public function FindUser($account){
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            //用户信息
            $userinfo = null;

            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            return $DB->GetRowFromList(MYSQL_USER_LIST,mysql_key_account,$account);
        }

        /*
         * 验证参数格式
         * 错误返回false
         * 成功返回this
         * */
        public function VerifyFormat(){
            $verifier = new FormatChecker();
            if(!$verifier->FromAccount($this->account) || !$verifier->FromPassword($this->password) ||
                !$verifier->FromTime($this->time) || !$verifier->FromNormalNum($this->rnd))
            {
                return false;
            }
            return $this;
        }

        /*
         * 验证密码
         * 错误返回原因
         * 成功返回true，并将jct存入user_data
         * */
        public function Login(&$user_data){
            //初始化数据库

            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            //用户信息
            $userinfo = $DB->GetRowFromList(                    //从数据库中查找数据
                MYSQL_USER_LIST,
                array(
                    mysql_key_account => $this->account
                ),
                'or'
            );

            switch ($userinfo)
            {
                case $DB::unexist_data:     return passport_unexist_act;       //账号不存在
                case $DB::server_error:     return passport_server_error;      //服务器吃屎了
            }

            if(\NFG\encryptPassword($this->password) != $userinfo[mysql_key_password])
            {
                return passport_wrong_pswd;
            }

            $id_sign = \NFG\getSrmJct(32);                //随机获取一个jct
            if($DB->_is_failed(
                $DB->SetInList(MYSQL_USER_LIST,mysql_key_jct,$id_sign,mysql_key_account,$userinfo['act'])
            ))
            {
                return passport_server_error;
            }
            $user_data = array(
                'account'  => $userinfo['act'],
                'email'    => $userinfo['email'],
                'uid'      => $userinfo['uid'],
                'reg_time' => $userinfo['register_time'],
                'srm_jct'  => $id_sign
            );
            return true;
        }

        /*
         * 注册账号（其实就是往数据库里加一个账号记录）
         *
         * */
        public function Register(&$user_data){
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            $uid = 0;
            $db_result = $DB->GetRowFromList(
                MYSQL_USER_LIST,
                array(
                    mysql_key_account => $this->account,
                    mysql_key_email => $this->email
                ),
                'or'
            );
            //如果返回为unexist，则表示未发现这个账号，可以注册
            if($db_result == $DB::server_error)
            {
                return passport_server_error;
            }
            if($db_result != $DB::unexist_data)             //已经存在这个账号或者邮箱了
            {
                return constant('passport_register_repeat_account&email');
            }
            $reg_time = time();
            $srm_jct  = \NFG\getSrmJct(32);
            $db_result = $DB->InsertIntoList(
                MYSQL_USER_LIST,
                array(
                    mysql_key_account       => $this->account,
                    mysql_key_email         => $this->email,
                    mysql_key_password      => \NFG\encryptPassword($this->password),
                    mysql_key_register_time => $reg_time,
                    mysql_key_uid           => $uid,
                    mysql_key_jct           => $srm_jct
                )
            );
            if($DB->_is_failed($db_result))
            {
                return $db_result;
            }
            $user_data = array(
                'account'  => $this->account,
                'email'    => $this->email,
                'uid'      => $uid,
                'reg_time' => $reg_time,
                'srm_jct'  => $srm_jct,
            );
            return true;
        }

        //更新jct
        static protected function UpdateJct($jct){
            $_SESSION[SESSION_LOGIN_TIME] = time();
            $_SESSION[SESSION_SRM_JCT] = $jct;
            setcookie(COOKIE_SRM_JCT,$jct,time() + COOKIE_SAVING_TIME , "/");
        }

        /*
         * 检测jct是否在线，如果在线就更新jct时间
         *
         * */
        static public function CheckJct($jct){
            //短期频繁登录用户直接用SESSION操作
            if(isset($_SESSION[SESSION_SRM_JCT]) && isset($_COOKIE[COOKIE_SRM_JCT]) && isset($_SESSION[SESSION_LOGIN_TIME]))
            {
                if($_SESSION[SESSION_SRM_JCT] == $_COOKIE[COOKIE_SRM_JCT] && $_SESSION[SESSION_LOGIN_TIME] + JCT_MAX_TIME <= time())
                {
                    self::UpdateJct($jct);
                    return true;
                }else{
                    return passport_jct_offline;
                }
            }

            //长期没登录（十天之内），使用数据库登录
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            $db_result = $DB->GetRowFromList(
                MYSQL_USER_LIST,
                array(
                     mysql_key_jct => $jct
                ),
                'or'
            );
            switch ($db_result)
            {
                case $DB::unexist_data: return passport_jct_offline;
                case $DB::server_error: return passport_server_error;
            }

            if($db_result[mysql_key_jct] != $jct || $db_result[mysql_key_login_time] + JCT_MAX_TIME < time())
            {
                return passport_jct_offline;
            }

            self::UpdateJct($jct);
            return true;
        }
    }