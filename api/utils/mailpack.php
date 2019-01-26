<?php
    include_once(dirname(__FILE__) . "/../Config.php");
    include_once (FILEPATH . "/phpmailer/PHPMailerAutoload.php");

    function sendMail($reciever,$title,$content){
        $mail = new PHPMailer;

        // 是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式，
        // 可选择的值有 1 、 2 、 3
        // $mail->SMTPDebug = 2;     

        //使用smtp鉴权方式发送邮件
        $mail->isSMTP();                                      
        //smtp需要鉴权 这个必须是true
        $mail->SMTPAuth = true;                               
        $mail->Host = EMAIL_SERVER_HOST;
        $mail->Username = EMAIL_SERVER_USER;
        $mail->Password = EMAIL_SERVER_PASSWORD;
        //设置使用ssl加密方式登录鉴权
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        //设置发送的邮件的编码 也可选 GB2312
        $mail->CharSet = 'UTF-8';

        $mail->setFrom(EMAIL_SERVER_USER, 'YeuolyBlog');

        $mail->addAddress($reciever);
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $content;

        if(!$mail->send()) {
        return 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
        return send_mail_success;
        }
    }