<template>
  <div id="app">
    <ConstHeader/>
    <div class="vertical-blank-block"></div>
    <AboutList />
    <div class="vertical-blank-block"></div>
    <IndexUpdateLog />

  </div>
</template>

<script>

import IndexUpdateLog from './components/IndexUpdateLog'
import AboutList from './components/AboutList'
import ConstHeader from './components/ConstHeader'

export default {
  name: 'app',
  components: {
    ConstHeader,
    IndexUpdateLog,
    AboutList,
  }
}
</script>

<style>
  .card {
    box-shadow: 1px 1px 2px #a99f9f;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 70%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    border-radius: 5px;
  }

  .card-title{
    width: 30%;
    margin: 0 auto;
    text-align: center;
    color: rgb(62, 62, 62);
  }

  .card-content{
    width: 80%;
    margin: 0 auto;
    font-size: 15px;
    line-height: 20px;
  }
</style>
