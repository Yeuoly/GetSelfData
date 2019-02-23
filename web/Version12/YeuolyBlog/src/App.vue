<template>
  <div id="app">
    <ConstDom />
    <router-view></router-view>
  </div>
</template>

<script>

import ConstDom from './components/ConstDom'

export default {
  name: 'app',
  components: {
    ConstDom,
  }
}

</script>

<style>
  @import "../public/css/main.css";

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
