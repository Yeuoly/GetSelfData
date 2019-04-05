<template>
    <div class="content" @click="visitable = !visitable">
        <div :class="'dropdown' + (visitable ? ' open' : '')">
            <div class="item">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonDropDownList",
        data () {
            return {
                visitable : false
            }
        }
    }
</script>

<style scoped>

    .content::before{
        content: "\e606";
        cursor: pointer;
    }

    .dropdown{
        transition: all 10s cubic-bezier(0.25, 0.1, 0.32, 1.03);
        display: none;
        position: absolute;
        border: 1px solid #d7dfeab8;
        min-width: 60px;
        margin-left: -80px;
        border-radius: 8px;
        text-align: center;
        overflow: auto;
        height: 0;
    }

    .open{
        display: block;
        height: auto;
    }

    .item div{
        padding-top: 8px;
        background: rgba( 244 , 244 , 244);
        width: 100px;
        height: 30px;
        cursor: pointer;
    }

    .item div:hover{
        color: #00b5e5;
    }

</style>