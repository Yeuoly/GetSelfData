<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/12
 * Time: 15:55
 */

/**
 * 检测字符格式
 */

    class FormatChecker
    {

        public function FromMethod($src)
        {
            if($src == "" || !is_string($src))
            {
                return false;
            }
            return true;
        }

        public function FromJct($src)
        {
            if(!isset($src) || !is_string($src) || strlen($src) != 32)
            {
                return false;
            }
            return true;
        }

        public function FromTime($time,$offset = 2)
        {
            $current_time = time();
            if(!$time = intval($time) ||!isset($time) ||!($time <= $current_time && $time + $offset >= $current_time ))
            {
                return false;
            }
            return true;
        }

        public function FromPassword($password)
        {
            if(!preg_match('/\b[a-zA-Z0-9\.]{6,16}\b/',$password))
            {
                echo 'd';
                return false;
            }
            return true;
        }

        public function FromAccount($account)
        {
            return $this->FromPassword($account);
        }

        public function FromEmail($email)
        {
            if(!preg_match('/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/',$email))
            {
                echo 'a';
                return false;
            }
            return true;
        }

        public function FromNormalNum($rnd)
        {
            if(!isset($rnd) || !intval($rnd))
            {
                echo 'b';
                return false;
            }
            return true;
        }

        public function FromNormalStr($str){
            if(!isset($str) || !is_string($str)){
                return false;
            }
            return true;
        }
    }
