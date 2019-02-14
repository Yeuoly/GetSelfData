<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/1/25
     * Time: 17:03
     */

    class Base
    {
        /*
         * 用于检测结果是否成功
         *
         * */
        final static public function _is_failed($src){
            if(is_string($src) || !$src)
            {
                return true;
            }elseif(is_int($src) && $src == -2){
                return true;
            }
            return false;
        }
    }
