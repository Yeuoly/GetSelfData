<template>
    <div class="black-cover" id="black-cover" @click=mouseClick></div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication";

    export default {
        name : 'ConstBlackCover',
        data () {
            return {
                //函数绑定缓存，储存多组json格式的数据，对应法则为
                //{ func: 目标函数 , isConst: 是否在执行完一次函数之后清除本元素}
                //func定义为事件，最终储存在bindCache中的事件集合定义为事件列表
                //isConst定义为固定事件标识符，如果这个事件是一个在运行完之后不从事件列表中删去的事件，则其为固定事件
                bindCache : [
                    {
                        //默认事件，点击事件产生时发出一个提示
                        func: function(){
                            //console.log('Event : click #black_cover');
                        },
                        //这个事件是默认的固定事件
                        isConst : true
                    }
                ]
            }
        },
        methods : {
            //点击黑幕时处理掉绑定在黑幕的onclick事件（依此调用加清空不必要的函数缓存）
            mouseClick () {
                for(let dep in this.bindCache){
                    this.bindCache[dep].func();
                }
                this.unbind();
            },
            //清理函数缓存，留下固定事件，删去非固定事件
            unbind () {
                let bindCache_buf = [];
                for(let dep in this.bindCache){
                    if(this.bindCache[dep].isConst){
                        bindCache_buf.push(this.bindCache[dep]);
                    }
                }
                this.bindCache = bindCache_buf;
            },
            //添加函数缓存
            //参数为一个字典，或者为一个函数，固定事件表示默认为false
            bind (src) {
                let type = typeof src;
                //如果传进来的是一个对象（字典）
                if(type === 'object'){
                    //判断其类型是否为我们所需要的类型
                    if(typeof src.func === 'function' && (typeof src.isConst === 'undefined' || typeof src.isConst ==='boolean')){
                        //利用三段运算符给isConst一个默认值（Js不支持直接的默认值真的很蛋疼）
                        src.isConst = src.isConst ? src.isConst : false;
                        this.bindCache.push(src);
                    }else{
                        //console.error('Wrong type in function-bind');
                    }
                    //如果传入的是一个函数
                }else if(type === 'function'){
                    //手动构建一个对象push进cache
                    this.bindCache.push({
                        func : src,
                        isConst : false
                    });
                }else{
                    //console.error('Wrong type in function-bind');
                }
            },
            //开启黑幕
            open () {
                let blackCover = document.getElementById('black-cover');
                blackCover.style.setProperty('z-index','1');
                blackCover.style.setProperty('opacity','0.6');
            },
            //关闭
            close () {
                let blackCover = document.getElementById('black-cover');
                blackCover.style.setProperty('opacity','0');
                setTimeout(function () {
                    blackCover.style.setProperty('z-index','-1');
                } , 500);
            },
            initEvent () {
                GlobalCommunication.$on('openBlackCover', this.open );
                GlobalCommunication.$on('closeBlackCover', this.close );
                GlobalCommunication.$on('bindClickBlackCover', this.bind );
                GlobalCommunication.$on('unbindClickBlackCover', this.unbind );
            }
        },
        mounted () {
            this.initEvent();
        }
    }

</script>

<style>

</style>