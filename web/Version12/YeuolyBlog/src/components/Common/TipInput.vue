<template>
    <div class="item">
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
        <div :class="'tip' + (tipColor ? (' ' + tipColor) : '')">
            <div v-html="tip"></div>
        </div>
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
            hostValue : String,
            tipColor : String
        },
        name: "PassportInput",
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
        width: 100%;
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
        margin: 0 auto;
        width: 95%;
        vertical-align: middle;
        background: white;
        border-radius: 5px;
        border: rgba(128,128,128,0.3) 1px solid;
        margin-bottom: 5px;
    }

    .tip{
        margin: 0 auto;
        width: 95%;
        height: 15px;
        color: #ff5252;
    }

    input::placeholder{
        color: rgba(128,128,128,0.7);
    }

    .grey{
        color: rgba(0, 0, 0, 0.42) !important;
    }

    .red{
        color: #ff5252 !important;
    }

    .green{
        color: #5EFF8F !important;
    }
</style>