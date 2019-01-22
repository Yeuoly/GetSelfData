<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/1/21
     * Time: 14:28
     *
     * Version : 1.0.0-alpha
     */

    define("captcha_head","captcha_");
    define("captcha_timetail","_expiretime");

    /*
     * 自带Session验证，不用管用户的身份，直接用就能验证了
     *
     * */
    class Verify
    {
        //验证码本体
        protected $captcha      = 0;
        protected $expiretime   = 600;
        /*
         * 将验证码存入Session，需要先开启Session
         * 参数method为验证session名后缀
         * 成功返回this
         *
         * */
        public function SaveCaptcha($method,$expiretime = 600)
        {
            $this->expiretime = $expiretime;
            $_SESSION[captcha_head.$method] = md5($this->captcha);
            $_SESSION[captcha_head.$method.captcha_timetail] = $expiretime+time();
            return $this;
        }

        /*
         * 验证用户返回，需要先开启Session
         * 参数method为验证session名后缀，src为字符串,为用户返回值
         * 成功返回this
         *
         * */
        public function Verfiy($method,$src)
        {
            if(!isset($_SESSION[captcha_head.$method]))return passport_verification_nocaptcha;
            if(!is_string($src))return false;
            if($_SESSION[captcha_head.$method] != md5(intval($src)))return wrong_captcha;
            if($_SESSION[captcha_head.$method.captcha_timetail] < time())return passport_meaningless_try;
            unset($_SESSION[captcha_head.$method]);
            return true;
        }
    }

    /*
     * 验证数学计算验证码
     *
     * */
    class VerfiyMathCatpcha extends Verify
    {
        //输出到浏览器的图片
        protected $output_image = null;
        /*
         * 生成验证码
         *
         * */
        public function CreateCaptcha()
        {
            $image = imagecreatetruecolor(100, 30);

            //2.为画布定义(背景)颜色
            $bgcolor = imagecolorallocate($image, 255, 255, 255);

            //3.填充颜色
            imagefill($image, 0, 0, $bgcolor);

            // 4.设置验证码内容

            //4.1 创建一个变量存储产生的验证码数据，便于用户提交核对
            $captcha = array(0,0);
            for ($i = 0; $i < 3; $i++) {
                // 字体大小
                $fontsize = 20;
                // 字体颜色
                $fontcolor = imagecolorallocate($image, mt_rand(0, 120), mt_rand(0, 120), mt_rand(0, 120));
                // 设置字体内容
                $fontcontent = "";
                if($i == 0 || $i == 2) {
                    $fontcontent = rand(3,10);
                    if($i == 0)$captcha[0] = $fontcontent;
                    else $captcha[1] = $fontcontent;
                }elseif($i == 1) {
                    $fontcontent = "*";
                }
                $x = ($i * 100 / 4) + mt_rand(5, 10);
                $y = mt_rand(5, 10);
                // 填充内容到画布中
                imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
            }

            //4.3 设置背景干扰元素
            for ($$i = 0; $i < 200; $i++) {
                $pointcolor = imagecolorallocate($image, mt_rand(50, 200), mt_rand(50, 200), mt_rand(50, 200));
                imagesetpixel($image, mt_rand(1, 99), mt_rand(1, 29), $pointcolor);
            }

            //4.4 设置干扰线
            for ($i = 0; $i < 3; $i++) {
                $linecolor = imagecolorallocate($image, mt_rand(50, 200), mt_rand(50, 200), mt_rand(50, 200));
                imageline($image, mt_rand(1, 99), mt_rand(1, 29), mt_rand(1, 99), mt_rand(1, 29), $linecolor);
            }
            //储存验证码本体及图片
            $this->captcha = $captcha[0]*$captcha[1];
            $this->output_image = $image;
            return $this;
        }

        public function Output()
        {
            imagepng($this->output_image);
            return $this;
        }

        public function DestoryImage()
        {
            imagedestroy($this->output_image);
            return $this;
        }
    }

    class VerfiyEmail extends Verify
    {
        /*
        * 生成验证码
        *
        * */
        public function CreateCaptcha($min = 10000,$max = 99999)
        {
            srand(time());
            $this->captcha = rand($min,$max);
            return $this;
        }

        /*
         * 发送邮件
         *
         * */
        public function Send($to,$welcome)
        {
            include_once (FilePath . "/utils/mailpack.php");
            $msg = $welcome."您的验证码为：".$this->captcha.
                "，验证码有效时间为：".intval($this->expiretime/60).
                "请尽快完成操作~";
            $send_result = sendMail($to,"YeuolyBlog邮箱验证码",$msg);
            if($send_result == send_mail_success)return true;
            return $send_result;
        }

    }


