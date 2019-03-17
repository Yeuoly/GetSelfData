<template>
    <div class="item">
        <label :for="ID">
            <div class="holder">
                <input :id="ID"
                       class="font-normal-size passport-input"
                       :type="type"
                       :placeholder="placeholder"
                       :value="hostValue"
                       @input="handleInput"
                       @keyup="handleKeyUp"
                >
            </div>
            <div id="tip-passport-account" class="tip">
                <div v-html="tip"></div>
            </div>
        </label>
    </div>
</template>

<script>
    export default {
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            placeholder : String,
            ID : String,
            type : String,
            tip : String,
            hostValue : String
        },
        name: "PassportInput",
        data () {
            return {

            }
        },
        methods : {
            handleInput(e){
                this.$emit('change',e.target.value);
            },
            setTip(content){
                this.tip = content;
            },
            handleKeyUp(){
                this.$emit('VKeyup');
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
        width: calc(100% - 20px);
        font-size: 18px;
    }

    .holder{
        width: 95%;
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