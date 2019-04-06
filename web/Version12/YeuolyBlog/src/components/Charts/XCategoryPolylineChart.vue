<template>
    <div class="" :id="id"></div>
</template>

<script>
    export default {
        name: "XCategoryPolylineChart",
        props : {
            src : Array,

        },
        data(){
            return{
                id : ''
            }
        },
        mounted() {
            let i = Math.random();
            this.id = i;
            let chart = this.$echarts.init(document.getElementById(i));
            chart.setOption(
                {
                    title : this.src['title'],
                    tooltip : { trigger: 'axis' },
                    xAxis : {
                        type : 'category',
                        data : this.src['x']
                    },
                    yAxis : {
                        type : 'value'
                    },
                    legend: {
                        data: this.src['lengend']['data'] ? this.src['lengend']['data'] : ['数据']
                    },
                    series : [
                        {
                            name : '访问量',
                            type : 'line',
                            itemStyle : {
                                normal : {
                                    color : '#607d8b'
                                }
                            },
                            data : this.src['series']['data'],
                            markLine : {
                                data : this.src['series']['average'] ? [{ type : 'average' , name : this.src['series']['average']['name'] }] : null
                            },
                            markPoint : {
                                data : [
                                    this.src['series']['max'] ? { type : 'max', name: this.src['series']['max']['name'] } : null,
                                    this.src['series']['min'] ? { type : 'min', name: this.src['series']['min']['name'] } : null
                                ]
                            }
                        },
                    ]
                }
            )
        }
    }
</script>

<style scoped>

</style>