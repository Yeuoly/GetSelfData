<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/14
 * Time: 22:37
 */

class HookFunc{
    /*
     * 传这个钩子对象所在的父级对象进来
     *
     * */
    public function __construct()
    {

    }

    //缓存钩子
    protected $hookList = [

    ];

    //注册添加钩子，params可以是数组也可以是普通的对象或者参数
    final public function add($func , $params){
        array_push($this->hookList,[
            'func' => $func,
            'params' => $params
        ]);
    }

    final public function remove($func){
        foreach ($this->hookList as $k => $v)
        {
            if ($v == $func)
            {
                unset($this->hookList[$k]);
            }
        }
    }

    //运行钩子
    final public function run(){

        foreach ($this->hookList as $k => $v)
        {
            call_user_func($this->hookList[$k]['func'] , $this->hookList[$k]['params']);
        }
    }
}