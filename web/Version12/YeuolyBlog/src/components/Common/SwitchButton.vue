<template>
    <div>
        <div :class="'switch-button' + (className ? (' ' + className) : '')"
             @click="value = !value"
             v-on="listener"
        >
            <div class="-bkg"></div>
            <div :class="'-hd' + ( value ? ' hd-true' : ' hd-false')"></div>
            <div :class="'-button' + ( value ? ' btn-true' : ' btn-false')"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "SwitchButton",
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            hostValue : Boolean,
            className : String
        },
        data(){
            return{
                value : Boolean
            }
        },
        methods : {
            change(){
                this.$emit('change',this.value);
            }
        },
        computed : {
            listener(){
                return this.$listeners;
            }
        },
        watch : {
            hostValue : {
                handler(){
                    this.value = this.hostValue;
                },
                immediate : true
            },
            value(){
                this.change();
            }
        }
    }
</script>

<style scoped>

    .switch-button{
        overflow: hidden;
        cursor: pointer;
        width: 60px;
        height: 26px;
        border-radius: 12px;
        position: relative;
    }

    .switch-button .-button{
        width: 28px;
        height: 28px;
        background-color: #e5e5e5;
        border-radius: 13px;
        position: absolute;
        top: -1px;
        transition: .3s ease;
    }

    .switch-button .-bkg{
        background-color: #D24D57;
        width: 53px;
        height: 100%;
        position: absolute;
        right: 0;
        border-radius: 13px;
    }

    .switch-button .-hd{
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        transition: .3s ease;
        background-color:  #1bcc64;
    }

    .switch-button .hd-true{
        width: 53px;
    }

    .switch-button .btn-true{
        transform: translateX(36px);
    }

</style>