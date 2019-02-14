<?php
/*
class HookFunc{
    public function __construct($object)
    {
        $this->object = $object;
    }

    //缓存钩子
    protected $hookList = [

    ];

    protected $object = null;

    //注册添加钩子
    public function add($func , $params){
        array_push($this->hookList,[
            'func' => $func,
            'params' => $params
        ]);
    }

    //运行钩子
    public function run(){
        foreach ($this->hookList as $k => $v)
        {
            call_user_func([$this->object ,$this->hookList[$k]['func']] , $this->hookList[$k]['params']);
        }
    }
}

class A{
    private $Hook;

    public function __construct()
    {
        $this->Hook = new HookFunc($this);
    }

    public function sayHello($name){
        echo "[ $name ]: hello";
    }

    public function hookSayHello($name){
        $this->Hook->add("sayHello","$name");
    }

    public function runHook(){
        $this->Hook->run();
    }
}

$P = new A();
$P->hookSayHello("LiZiMing");
$P->runHook();

$N = new A();
$N->hookSayHello("WangXiaoHong");
$N->runHook();*/