<template>
    <div id="passport">
        <div id="passport-item-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import { GlobalCommunication } from "../../js/GlobalCommunication";

    export default {
        name : 'PassportPage',
        methods : {
            select(){
                if(this.$store.getters.userInfo.online) {
                    this.$router.push({ name : 'register' });
                    this.$utils.messageBox('您已经登录了哦~再注册一个咩？');
                }
                else
                    this.$router.push({ name : 'login' });
            }
        },
        created() {
            //需要判断第一次加载用户信息是否完毕，如果没加载完就等待加载完后发出的广播，加载完了就直接执行
            if(!this.$store.getters.userInfo.firstLoad){
                GlobalCommunication.$on('firstLoadOver',this.select);
            }else{
                //第一次挂载组件时不会触发updated钩子，所以在created里面调用这个钩子
                setTimeout(()=>{this.select();});
            }
        },
        updated() {
            //避免子路由造成的重复刷新
            if(this.$route.name === 'passport')
            {
                setTimeout(() => {
                    this.select();
                } , 100)
            }
        }
    }
</script>

<style scoped>

    #passport-item-container{
        overflow: auto;
        width: 30vw;
        margin: auto;
        background: rgba(244,244,244,0.3);
        padding-top: 30px;
        margin-top: 60px;
        border-radius: 8px;
        min-height: 30vh;
        padding-bottom: 30px;
        box-shadow: rgba(0,0,0,.2) 0 1px 2px;
    }

    @media (max-width: 1276px) {
        #passport-item-container{
            width: 90vw;
        }
    }


</style>