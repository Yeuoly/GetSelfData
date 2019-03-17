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

    include_once (dirname(__FILE__) . "/../../Config.php");
    include_once (FILEPATH . "/utils/class/class.DBController.php");
    include_once (FILEPATH . "/utils/class/class.Format.php");
    include_once (FILEPATH . "/utils/class/class.Encrypt.php");
    include_once (FILEPATH . "/utils/functions.php");
    include_once (FILEPATH . "/utils/class/class.HookFunc.php");

    define("mysql_key_password","pswd");
    define("mysql_key_jct","srm_jct");
    define("mysql_key_account","act");
    define("mysql_key_email","email");
    define("mysql_key_register_time","register_time");
    define("mysql_key_uid","uid");
    define("mysql_key_login_time","login_time");
    define("mysql_key_class","class");
    define("mysql_key_lv","lv");
    define("mysql_key_exp","lv.exp");
    define("mysql_key_postID","postID");
    define("mysql_key_postOrder","post_order");

    class AccountAction extends Base
    {
        private $account = "";
        private $password = "";
        private $email = "";

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
        static public function FindUser($account){
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            //用户信息
            $userinfo = null;

            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            return $DB->GetRowFromList(MYSQL_USER_LIST,[ 'act' => $account ]);
        }

        /*
         * 验证参数格式
         * 错误返回false
         * 成功返回this
         * */
        public function VerifyFormat(){
            $verifier = new FormatChecker();
            if(!$verifier->FromAccount($this->account) || !$verifier->FromPassword($this->password))
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
        public function Login(&$srm_jct){
            //初始化数据库

            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }

            //用户信息
            $userinfo = $DB->GetRowFromList(                    //从数据库中查找数据
                MYSQL_USER_LIST,
                [
                    mysql_key_account => $this->account
                ],
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
                $DB->SetInList(MYSQL_USER_LIST,mysql_key_jct,$id_sign,mysql_key_account,$userinfo[mysql_key_account])
            ))
            {
                return passport_server_error;
            }
            if($DB->_is_failed(
                $DB->SetInList(MYSQL_USER_LIST,mysql_key_login_time,time(),
                                mysql_key_account,$userinfo[mysql_key_account])
            ))
            {
                return passport_server_error;
            }
            $srm_jct = $id_sign;
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
                [
                    mysql_key_account => $this->account,
                    mysql_key_email => $this->email
                ],
                'or',
                $uid
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
            $login_time = $reg_time;
            $srm_jct  = \NFG\getSrmJct(32);
            $db_result = $DB->InsertIntoList(
                MYSQL_USER_LIST,
                [
                    mysql_key_account       => $this->account,
                    mysql_key_email         => $this->email,
                    mysql_key_password      => \NFG\encryptPassword($this->password),
                    mysql_key_register_time => $reg_time,
                    mysql_key_uid           => $uid,
                    mysql_key_jct           => $srm_jct,
                    mysql_key_login_time    => $login_time,
                    mysql_key_class         => USER_POWER_NORMAL,
                    mysql_key_lv            => 1,
                    mysql_key_exp           => 0
                ]
            );
            if($DB->_is_failed($db_result))
            {
                return $db_result;
            }
            $user_data = [
                'account'  => $this->account,
                'email'    => $this->email,
                'uid'      => $uid,
                'reg_time' => $reg_time,
                'srm_jct'  => $srm_jct,
            ];
            //创建用户的专属数据表
            $sql = "CREATE TABLE `user_self_hash_list_$uid`  (
                      `postID` varchar(32) NULL,
                      `post_order` int UNSIGNED NOT NULL AUTO_INCREMENT,
                      PRIMARY KEY (`post_order`)
                    );";
            if(!$DB->Query($sql))
            {
                return data_action_failedCreateUserList;
            }
            return true;
        }

        //更新jct
        static protected function UpdateJct($jct){
            $_SESSION[SESSION_USERDATA][SESSION_LOGIN_TIME] = time();
            $_SESSION[SESSION_USERDATA][SESSION_SRM_JCT] = $jct;
            setcookie(COOKIE_SRM_JCT,$jct,time() + COOKIE_SAVING_TIME , "/");
        }

        /*
         * 检测jct是否在线，如果在线就更新jct时间
         *
         * */
        static public function CheckJct($jct,&$user_data = null){
            //短期频繁登录用户直接用SESSION操作
            if(isset($_SESSION[SESSION_USERDATA][SESSION_SRM_JCT]) &&
                isset($_COOKIE[COOKIE_SRM_JCT]) &&
                isset($_SESSION[SESSION_USERDATA][SESSION_LOGIN_TIME]))
            {
                if($_SESSION[SESSION_USERDATA][SESSION_SRM_JCT] == $_COOKIE[COOKIE_SRM_JCT] &&
                    $_SESSION[SESSION_USERDATA][SESSION_LOGIN_TIME] + JCT_MAX_TIME >= time())
                {
                    self::UpdateJct($jct);
                    $user_data = $_SESSION[SESSION_USERDATA];
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
                [
                     mysql_key_jct => $jct
                ],
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
            //将用户登录信息存入session并返回给user_data
            $login_data = [
                SESSION_SRM_JCT    => $db_result[mysql_key_jct],
                SESSION_LOGIN_TIME => time(),
                SESSION_USER_CLASS => $db_result[mysql_key_class],
                SESSION_USER_ID    => $db_result[mysql_key_account],
                SESSION_USER_EMAIL => $db_result[mysql_key_email],
                SESSION_USER_LV    => $db_result[mysql_key_lv],
                SESSION_USER_EXP   => $db_result[mysql_key_exp],
                SESSION_USER_UID   => $db_result[mysql_key_uid]
            ];
            $_SESSION[SESSION_USERDATA] = $login_data;
            $user_data = $login_data;
            return true;
        }
    }