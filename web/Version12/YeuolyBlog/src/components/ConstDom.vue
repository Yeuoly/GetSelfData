<template>
    <div id="ConstDom">
        <ConstMenu />
        <ConstHeader />
        <ConstBlackCover />
    </div>
</template>

<script>
    import ConstBlackCover from './ConstBlackCover';
    import ConstMenu from './ConstMenu';
    import ConstHeader from './ConstHeader';

    export default {
        name : 'ConstDom',
        components : {
            ConstBlackCover,
            ConstMenu,
            ConstHeader
        }
    }

</script>