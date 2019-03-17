<template>
    <div id="about-website">
        <AboutList />
        <div class="vertical-blank-block"></div>
        <IndexUpdateLog />
    </div>
</template>

<script>
    import AboutList from '../Items/AboutList';
    import IndexUpdateLog from '../Items/IndexUpdateLog';

    export default {
        name : 'AboutPage',
        components : {
            AboutList,
            IndexUpdateLog
        },
        mounted() {

        }
    }
</script>

<style>
    #about-website{
        width: 60vw;
        margin: 30px auto;
        box-shadow: rgba(0,0,0,.2) 0 1px 1px;
        padding: 10px;
        color: rgba(0,0,0,.8);
    }
</style>
