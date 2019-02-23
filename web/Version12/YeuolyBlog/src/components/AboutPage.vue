<template>
    <div id="about-website">
        <div class="vertical-blank-block"></div>
        <AboutList />
        <div class="vertical-blank-block"></div>
        <IndexUpdateLog />
    </div>
</template>

<script>
    import AboutList from './AboutList';
    import IndexUpdateLog from './IndexUpdateLog';

    export default {
        name : 'AboutPage',
        components : {
            AboutList,
            IndexUpdateLog
        }
    }
</script>
