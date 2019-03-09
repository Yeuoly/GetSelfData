<template>
    <div id="about-website">
        <div class="vertical-blank-block"></div>
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
