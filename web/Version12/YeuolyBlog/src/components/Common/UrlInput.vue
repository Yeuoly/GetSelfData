<template>
    <div class="url-input"
         @mouseleave="handleChange(); bottomBarShow = false"
         @mouseenter="bottomBarShow = true"
    >
        <div class="url-input-text">
            <input type="text"
                   v-model="vHostValue.text"
            >
        </div>
        <div class="url-input-url" v-show="bottomBarShow">
            <input type="text" placeholder="链接" v-model="vHostValue.url">
        </div>
    </div>
</template>

<script>
    export default {
        name: "UrlInput",
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            hostValue : String
        },
        data () {
            return {
                bottomBarShow : false,
                vHostValue : { text : '' , url : '' },
            }
        },
        methods : {
            handleChange () {
                this.$emit('change',JSON.stringify(this.vHostValue));
            }
        },
        watch : {
            hostValue : {
                handler () {
                    try {
                        this.vHostValue = JSON.parse(this.hostValue);
                    }catch (e) {

                    }
                },
                immediate : false,
                deep : true
            }
        }
    }
</script>

<style scoped>

    .url-input{
        position: relative;
    }

    .url-input-url{
        position: absolute;
        top: -20px;
        width: 200px;
    }

    .url-input input{
        border: 0;
        background-color: transparent;
        outline: none;
    }

</style>