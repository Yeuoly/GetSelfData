<template>
    <div :class="'top-tool-bar '+(className ? className : '')">
        <div class="holder">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "TopToolBar",
        props : {
            /***
                hostClass is in the same class with top-tool-bar
                use it to control the host object's style
             ***/
            className : String
        }
    }
</script>

<style scoped>

    .top-tool-bar{
        height: 30px;
        margin: 0 auto;
        margin-bottom: 5px;
        background-color: transparent;
    }

    .holder{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: 100%;
    }

    .holder div{
        transition: .5s all ease;
        flex: 1;
        overflow: auto;
        height: 100%;
        text-align: center;
        font-size: 17px;
        line-height: 30px;
    }

    .holder div:hover{
        background-color: rgba(0,0,0,.06);
        cursor: pointer;
    }

    .son{
        width: 100%;
        height: 80%;
        position: absolute;
        top: 5%;
    }

</style>