<template>
    <div class="side-tool-bar">
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SideToolBar"
    }
</script>

<style scoped>

    .side-tool-bar{
        width: 100%;
        height: 100%;
    }

    .slot{
        vertical-align: middle;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        border: rgba(0,0,0,.2) solid 1px;
        border-radius: 3px;
    }

    .slot div{
        flex: 1;
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        line-height: 40px;
    }

    .slot div:hover{
        background-color: rgba(0,0,0,.1);
    }


</style>