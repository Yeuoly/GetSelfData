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

    define("setting_key_user_setting","settings");
    define("setting_key_user_uid","uid");

    define("user_setting_list_head","user_setting_list_");

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

        /**
         * @param string $account the account of a user
         * @return mixed if success , will return user's info , if not will return the reason
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

        /**
         * This function is used to verify the format of information
         * @return mixed if failed , will return false , if not , will return this object
         * */
        public function VerifyFormat(){
            $verifier = new FormatChecker();
            if(!$verifier->FromAccount($this->account) || !$verifier->FromPassword($this->password))
            {
                return false;
            }
            return $this;
        }

        /**
         * This function is used to login , it will set the token to cookie
         * You will get the meta of user
         * @param array $srm_jct the information of user will be saved there
         * @return boolean success or not
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

        /**
         * @param string $user_data
         * @return array|bool|int|mixed|string|null
         */
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

        /**
         * this function will update the token and session
         * @param string $jct the token of login
         */
        static protected function UpdateJct($jct){
            setcookie(COOKIE_SRM_JCT,$jct,time() + COOKIE_SAVING_TIME , "/");
        }

        /**
         * @param $jct
         * @param null $user_data
         * @return bool|string
         */
        static public function CheckJct($jct,&$user_data = null){
/*            //短期频繁登录用户直接用SESSION操作
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
            }*/

            //取消短期登录令牌，前端已经更换路由，并不会那么频繁向后端发送请求，这样也间接修复了一个弱智bug
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
            /*//将用户登录信息存入session并返回给user_data*/
            //不存session了，改为存往Globals全局变量
            $login_data = [
                GLOBAL_SRM_JCT    => $db_result[mysql_key_jct],
                GLOBAL_LOGIN_TIME => time(),
                GLOBAL_USER_CLASS => $db_result[mysql_key_class],
                GLOBAL_USER_ID    => $db_result[mysql_key_account],
                GLOBAL_USER_EMAIL => $db_result[mysql_key_email],
                GLOBAL_USER_LV    => $db_result[mysql_key_lv],
                GLOBAL_USER_EXP   => $db_result[mysql_key_exp],
                GLOBAL_USER_UID   => $db_result[mysql_key_uid]
            ];
            $GLOBALS[GLOBAL_USERDATA] = $login_data;
            $user_data = $login_data;
            return true;
        }

        /**
         * This function is used to modify user's info
         * It will clear the session and the token in db
         * @param string $dest which info you wanna to modify
         * @param string $origin the origin value , if the value given is not the same
         *                       as the data in database , this direction will be failed
         * @param string $modified
         * @return boolean|string bool(true)->succeed , other->failed
         */
        public function updateUserInfo($dest,$modified,$origin = null){
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($DB->_is_failed($DB->Start()))
            {
                return passport_server_error;
            }
            switch ($dest){
                case 'avatar':
                    break;
                case 'id':
                    $formater = new FormatChecker();
                    if(!$formater->FromAccount($modified)){
                        //账号格式不符合规范
                        return user_action_format_wrong_account;
                    }
                    $res = $DB->SetInList(
                        MYSQL_USER_LIST,
                        mysql_key_account,
                        $modified,
                        mysql_key_uid,
                        $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]
                    );
                    if($DB->_is_failed($res)){
                        return server_error;
                    }
                    break;
                case 'email':

                    break;
                case 'password':
                    $formater = new FormatChecker();
                    if(!$formater->FromPassword($modified)){
                        //密码格式不符合规范
                        return user_action_format_wrong_password;
                    }
                    $origin_user_data = $DB->GetRowFromList(
                        MYSQL_USER_LIST,
                        [mysql_key_uid => $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]],
                        'or'
                    );
                    if($DB->_is_failed($origin_user_data))
                        return server_error;
                    $password_handled_origin = \NFG\encryptPassword($origin);
                    if($password_handled_origin != $origin_user_data[mysql_key_password])
                        return user_action_password_wrong;
                    $password_handled_modified = \NFG\encryptPassword($modified);
                    if($password_handled_modified == $password_handled_origin)
                        return user_action_same_password;
                    $res = $DB->SetInList(
                        MYSQL_USER_LIST,
                        mysql_key_password,
                        $password_handled_modified,
                        mysql_key_uid,
                        $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]
                    );
                    if($DB->_is_failed($res)){
                        return server_error;
                    }
                    //clear token
                    $res = $DB->SetInList(
                        MYSQL_USER_LIST,
                        mysql_key_jct,
                        '',
                        mysql_key_uid,
                        $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]
                    );
                    if($DB->_is_failed($res)){
                        return server_error;
                    }
                    //clear session
                    break;
            }
            unset($GLOBALS[GLOBAL_USERDATA]);
            return true;
        }


        /**
         * @param string $new_collection
         * @return bool|string
         */
        public function modifyUserSetting($new_collection){
            $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
            if($this->_is_failed($DB))
                return false;
            $result = $DB->SetInList(
                user_setting_list_head.intval($GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID] / 10),
                setting_key_user_setting,
                $new_collection,
                setting_key_user_uid,
                $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]
            );
            if(!$DB->_is_failed($result))
                return server_error;
            return true;
        }
    }