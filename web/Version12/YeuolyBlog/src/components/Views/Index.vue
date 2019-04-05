<template>
    <div id="index">
        <div class="visitor">
            <div id="charts" class="charts"></div>
        </div>
    </div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { InfoModule } from "../../js/module";

    export default {
        data () {
            return {
                visitStatistics : []
            }
        },
        methods : {
            getVisitStatisticsData(){
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('extra/count/get.php',InfoModule.dir_api),
                    {

                    },
                    (data) => {
                        if(data.data['res'] !== InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox('页面初始化失败','warn');
                            return;
                        }
                        let visitorDataCharts = this.$echarts.init(document.getElementById('charts'));
                        //x轴坐标
                        let xAxis = [];
                        //访问数据
                        let visitingData = [];
                        for(let i in data.data['data']){
                            if(typeof data.data['data'][i] !== 'object')continue;
                            xAxis.splice(i,0, this.$utils.date('M-D',data.data['data'][i]['begin_time']));
                            visitingData.splice(i,0,data.data['data'][i]['count']);
                        }
                        visitorDataCharts.setOption({
                            title : { text : '近期访问量' },
                            tooltip : { trigger: 'axis' },
                            xAxis : {
                                type : 'category',
                                data : xAxis
                            },
                            yAxis : {
                                type : 'value'
                            },
                            legend: {
                                data:['最高访问','最低访问']
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
                                    data : visitingData,
                                    markLine : {
                                        data : [
                                            { type : 'average' , name : '平均值' }
                                        ]
                                    },
                                    markPoint : {
                                        data : [
                                            { type : 'max', name: '今天人怎么这么多' },
                                            { type : 'min', name: '最冷却的一天'}
                                        ]
                                    }
                                },
                            ]
                        });
                    },
                    () => {
                        this.$emit('好像服务器挂掉惹','warn');
                    }
                )
            }
        },
        mounted() {
            setTimeout(this.getVisitStatisticsData,100);
        }
}
</script>

<style>
    #index {
        width: 100%;
        height: 100%;
    }

    .visitor{
        height: 90%;
        position: relative;
    }

    .charts{
        position: absolute;
        top: calc((60vh - 300px) / 2);
        left: 20%;
        width: 60%;
        height: 300px;
        border-bottom: #a99f9f solid 1px;
        border-right: #a99f9f solid 1px;
    }

    @media (max-width: 600px) {
        .charts{
            width: 100%;
            left: 0;
        }
    }
</style>