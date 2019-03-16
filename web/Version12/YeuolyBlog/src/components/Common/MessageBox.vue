<template>
    <div id="msgBox" :class="show ? 'msgBox-enter' : 'msgBox-leave'">
        <div :class="'srm-message-box srm-message-box-type-'+type">
            <div class="srm-message-box-content">
                <div :class="'srm-message-box-icon srm-message-box-icon-type-'+type"></div>
                <div :class="'srm-message-box-msg srm-message-box-msg-type-'+type">
                    {{content}}
                </div>
            </div>
        </div>
    </div>
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
                time : 3000,
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
                    setTimeout(function () {
                        self.over = true;
                        self.type = 'normal';
                        self.content = 'none';
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
            list (newVal) {
                if(newVal.length !== 0 && this.listEmpty){
                    this.listEmpty = false;
                    this.switchMsg();
                }
            }
        }
    }
</script>

<style scoped>
    #msgBox{
        background: white;
        transition: .5s all ease;
    }

    .msgBox-enter{
        transform: translateY(70px);
        opacity: 1;
    }

    .msgBox-leave{
        transform: translateY(0px);
        opacity: 0;
    }

    .srm-message-box{
        background: rgb(240,249,235);
        border-radius: 7px;
        position: absolute;
        top: -50px;
        width: 20vw;
        left: calc((100% - 20vw) / 2);
        min-height: 40px;
    }

    .srm-message-box-type-normal{
        border: 1px solid rgba(103,194,58,0.8);
    }

    .srm-message-box-icon-type-normal{

    }

    .srm-message-box-msg-type-normal{
        color: rgb(103,194,58);
    }

    /******************************/

    .srm-message-box-type-warn{
        border: 1px solid rgba(245,108,108,0.8);
    }

    .srm-message-box-icon-type-warn{

    }

    .srm-message-box-msg-type-warn{
        color: rgb(245,108,108);
    }

    /******************************/

    .srm-message-box-content{
        width: 90%;
        height: 95%;
        margin: 0 auto;
    }

    .srm-message-box-msg{

    }

</style>