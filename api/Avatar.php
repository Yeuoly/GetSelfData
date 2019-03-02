<?php
    $usr = @$_GET['act'];
    if(!$usr)exit;
    header("Content-type: image/jpeg");
    $file = "../web/img/avatar/$usr.png";
    // 缩略图尺寸
    list($width, $height) = getimagesize($file);
    $newwidth = 50;
    $newheight = 50;
    // 加载图像
    $src_im = @imagecreatefromjpeg($file);
    $dst_im = imagecreatetruecolor($newwidth, $newheight);  
    // 调整大小
    imagecopyresized($dst_im, $src_im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
    //输出缩小后的图像
    imagejpeg($dst_im);
    imagedestroy($dst_im);
    imagedestroy($src_im);