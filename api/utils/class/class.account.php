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
     * 登录操作类
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
    define("mysql_key_register_time","reg_time");
    define("mysql_key_uid","uid");


    class AccountAction
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
        public function __construct()
        {
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

        public function __init($account = "",$password = "",$time = 0,$rnd = 0)
        {
            $this->password = $password;
            $this->account = $account;
            $this->time = $time;
            $this->rnd = $rnd;
            return $this;
        }

        public function __setEmail($email)
        {
            $this->email = $email;
            return $this;
        }

        /*
         * 验证参数格式
         * 错误返回false
         * 成功返回this
         * */

        public function FindUser($account)
        {
            $DB = new DB_Controller(mysql_db_host,mysql_user,mysql_password,mysql_dbname);
            //用户信息
            $userinfo = null;

            if(!$DB->Start())
            {
                return passport_server_error;
            }

            return $DB->GetRowFromList(mysql_user_list,mysql_key_account,$account);
        }

        public function VerifyFormat()
        {
            $verifier = new FormatChecker();
            if(!$verifier->FromAccount($this->account) || !$verifier->FromPassword($this->password) ||
                !$verifier->FromTime($this->time) || !$verifier->FromRnd($this->rnd))
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
        final public function Login(&$user_data)
        {
            //初始化数据库

            $DB = new DB_Controller(mysql_db_host,mysql_user,mysql_password,mysql_dbname);
            //用户信息

            if(!$DB->Start())
            {
                return passport_server_error;
            }

            $userinfo = $DB->GetRowFromList(                    //从数据库中查找数据
                mysql_user_list,
                array(
                    array(
                        'key' => mysql_key_account,
                        'val' => $this->account
                    )
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
            if(!$DB->SetInList(mysql_user_list,mysql_key_jct,$id_sign,mysql_key_account,$userinfo['act']))
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
        final public function Register(&$user_data)
        {
            $DB = new DB_Controller(mysql_db_host,mysql_user,mysql_password,mysql_dbname);
            if(!$DB->Start())
            {
                return passport_server_error;
            }

            $uid = 0;
            $db_result = $DB->GetRowFromList(
                mysql_user_list,
                array(
                    array(
                        'key' => mysql_key_account,
                        'val' => $this->account,
                    ),
                    array(
                        'key' => mysql_key_email,
                        'val' => $this->email
                    )
                ),
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
            $db_result = $DB->InsertIntoList(
                mysql_user_list,
                array(
                    mysql_key_account       => $this->account,
                    mysql_key_email         => $this->email,
                    mysql_key_password      => \NFG\encryptPassword($this->password),
                    mysql_key_register_time => time(),
                    mysql_key_uid           => $uid
                )
            );
            if(is_string($db_result))
            {
                return $db_result;
            }
            return true;
        }
    }