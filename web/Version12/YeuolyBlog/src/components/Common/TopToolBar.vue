<template>
    <div :class="'top-tool-bar '+hostClass">
        <div class="holder">
            <div v-for="dep in list" class="item">
                <div :class="dep.class + ' controller'" @click="dep.func" :title="dep.title">
                    <div v-html="dep.html" class="son">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import CommonButton from '../Common/CommonButton'

    export default {
        name: "TopToolBar",
        props : {
            /***   This list should be like
             {
                 html : htmlCode or just a string
                 func : a function which will be emit when click
                 class : just a style sign
                 title : it is a html attribute
             }
             ***/
            list : Array,

            /***
                hostClass is in the same class with top-tool-bar
                use it to control the host object's style
             ***/
            hostClass : String
        },
        components : {
            CommonButton
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

    .item{
        transition: .5s all ease;
        flex: 1;
        overflow: auto;
        height: 100%;
    }

    .controller{
        text-align: center;
        font-size: 17px;
        width: 100%;
        margin: 0 auto;
        height: 100%;
        vertical-align: middle;
        position: relative;
    }

    .item:hover{
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