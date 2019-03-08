<template>
    <transition name="msgBox">
        <div :class="'srm-message-box srm-message-box-type-'+type " v-show="show">
            <div class="srm-message-box-content">
                <div :class="'srm-message-box-icon srm-message-box-icon-type-'+type"></div>
                <div :class="'srm-message-box-msg srm-message-box-msg-type-'+type">
                    {{content}}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication";

    export default {
        name: "MessageBox",
        data(){
            return {
                content : '',
                type : 'normal',
                show : false,
                over : false,
                time : 999999,
                listEmpty : true,
                list : []
            }
        },
        methods : {
            closeBox(){
                this.show = false;
            },
            //添加新的消息队列成员
            addToQueue(object){
                this.list.push(object);
            },
            //更换消息
            switchMsg(){
                this.content = this.list[0].content;
                this.type = this.list[0].type;
                this.over = false;
                this.show = true;
                let self = this;
                setTimeout(function () {
                    self.show = false;
                    self.type = 'normal';
                    self.content = 'none';
                    setTimeout(function () {
                        self.over = true;
                        self.list.splice(0,1);
                        if(self.list.length === 0)
                            self.listEmpty = true;
                    },700);
                },self.time);
            }
        },
        mounted() {
            GlobalCommunication.$on('MessageBox',this.addToQueue);
        },
        watch : {
            //当一条消息完了，判断还有没有消息，有的话就切换下一条
            over (newVal) {
                if(newVal === true && this.list.length !== 0)
                    this.switchMsg();
            },
            //监听是否有新的消息加入，如果原本没有在执行的消息就直接切换消息，如果有的话不做处理，等待over切换
            list (newVal,oldVal) {
                if(newVal.length !== 0 && this.listEmpty){
                    this.listEmpty = false;
                    this.switchMsg();
                }
            }
        }
    }
</script>

<style scoped>

    .msgBox-enter-active, .msgBox-leave-active{
        transition: all .7s ease;
    }

    .msgBox-enter, .msgBox-leave-to{
        opacity: 0;
    }

    .msgBox-leave, .msgBox-enter-to{
        opacity: 1;
    }

    .srm-message-box{
        background: rgb(240,249,235);
        border-radius: 10px;
        position: fixed;
        top: 40px;
        width: 20vw;
        left: calc((100% - 20vw) / 2);
        height: 40px;
    }

    .srm-message-box-type-normal{
        border: 1px solid rgba(103,194,58,0.8);
    }

    .srm-message-box-icon-type-normal{

    }

    .srm-message-box-msg-type-normal{
        color: rgb(103,194,58);
    }

    .srm-message-box-content{
        width: 90%;
        height: 95%;
        margin: 0 auto;
    }

    .srm-message-box-msg{

    }

</style>