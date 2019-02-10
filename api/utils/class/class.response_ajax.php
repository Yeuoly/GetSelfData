<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/1/20
     * Time: 20:00
     *
     * Version : 1.0.0-alpha
     *
     */

    include_once(dirname(__FILE__) . "/../../Config.php");

    //用于处理每个api的输出json
    class ResponseAjax
    {
        private $result = array(
            'msg' => SUCCESS,
            'data' => array(
                'res' => SUCCESS,
                'error' => '',
                'data' => null
            )
        );

        public function output($shutdown = false)
        {
            echo json_encode($this->result,JSON_UNESCAPED_UNICODE);
            if($shutdown)exit;
        }

        public function set($index,$val,$shutdown = false)
        {
            switch ($index)
            {
                case 'msg':
                    $this->result['msg'] = $val;
                    break;
                default:
                    $this->result['data'][$index] = $val;
            }
            if($shutdown)$this->output(true);
        }
    }