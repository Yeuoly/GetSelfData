<template>
    <div class="item">
        <label :for="ID">
            <div class="holder">
                <input :id="ID"
                       class="font-normal-size passport-input"
                       type="text"
                       :placeholder="placeholder"
                       v-model="model"
                       @keyup="keyup(keyupP)"
                >
            </div>
            <div id="tip-passport-account" class="tip">
                {{tip}}
            </div>
        </label>
    </div>
</template>

<script>
    export default {
        props : {
            placeholder : String,
            ID : String,
            keyup : Function,
            keyupP : String,
            type : String,
        },
        name: "PassportInput",
        data () {
            return {
                model : '',
                tip : ''
            }
        },
        methods : {
            setTip(content){
                this.tip = content;
            }
        }
    }
</script>

<style scoped>
    .item{
        width: 80%;
        min-height: 60px;
        margin: 0 auto;
        margin-bottom: 15px;
    }

    .passport-input{
        padding: 10px;
        color: rgba(128,128,128,0.7);
        border: 0;
        margin: 0 auto;
        outline: none;
        width: 95%;
        font-size: 18px;
    }

    .holder{
        vertical-align: middle;
        background: white;
        border-radius: 5px;
        border: rgba(128,128,128,0.3) 1px solid;
        margin-bottom: 5px;
    }

    .tip{
        height: 15px;
        color: #ff5252 !important;
    }

    input::placeholder{
        color: rgba(128,128,128,0.7);
    }
</style>