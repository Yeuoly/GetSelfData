<template>
    <div :class="(enable ? 'btn-enable' : 'btn-disable') + ' btn-holder ' + (className ? className : '')" @click="handleClick">
        <div class="content" v-on="listener">
            <slot></slot>
            <div v-if="content !== ''" v-html="content">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonButton",
        props : {
            content : String,
            className : String,
            enable : Boolean
        },
        methods : {
            handleClick () {
                this.$emit('VClick');
            }
        },
        computed : {
            listener(){
                return this.$listeners;
            }
        }
    }
</script>

<style scoped>

    .btn-holder{
        transition: background-color .5s ease;
        overflow: auto;
        width: 100%;
        height: 35px;
        border-radius: 2px;
        background-color: white;
        text-align: center;
        vertical-align: middle;
        position: relative;
    }

    .content{
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        color: rgba(0,0,0,.72);
    }

    .btn-enable{
        cursor: pointer;
        box-shadow: rgba(0,0,0,.3) 0 1px 0;
        background-color: rgba(0,0,0,0);
        pointer-events: all;
    }

    .btn-enable:hover{
        background-color: rgba(0,0,0,.1)!important;
    }

    .btn-disable{
        color: #a99f9f;
        background-color: rgba(0,0,0,.05);
        pointer-events: none;
    }

</style>