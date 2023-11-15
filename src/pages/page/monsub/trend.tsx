import { Card, CardBody, Spacer } from '@nextui-org/react'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

async function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getChart"
    const res = await fetch(url, {method: 'POST', body})
    return await res.json()
}

function Trend({...props}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [loading2, setLoading2] = useState<boolean>(false)
    const [options, setOptions] = useState<any>({})
    const [options2, setOptions2] = useState<any>({})
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let xAxis: string[] = []
            let y0: number[] = []
            let y1: number[] = []
            let y2: number[] = []
            let y3: number[] = []
            const data = await linkFetch(JSON.stringify({ data: { statDate: props.dateSelect } }))
            const handleClick = (params: any) => {
                // 获取点击的柱子的索引
                const index = params.dataIndex
                // 根据索引获取对应的日期或时间值
                const clickedDate = xAxis[index]
                // 在这里处理提取的日期或时间值
                console.log(clickedDate)
            }
            if (data && data.data) {
                const sheet = data.data
                // 提取字段queryDate作为x轴
                xAxis = sheet.map((item: any) => item.queryDate)
                // 提取字段failedQueryCount作为y0轴的值
                y0 = sheet.map((item: any) => item.failedQueryCount)
                // 提取字段slowQueryCount作为y0轴的值
                y1 = sheet.map((item: any) => item.slowQueryCount)
                // 提取字段failedQueryRate作为y1轴的值
                y2 = sheet.map((item: any) => item.failedQueryRate)
                // 提取字段slowQueryRate作为y1轴的值
                y3 = sheet.map((item: any) => item.slowQueryRate)
            }
            let options = {
                title: {
                    text: '日期趋势（近7天）',
                    left: 'center',
                },
                legend: {
                    data: ['失败次数', '失败占比', '慢查询次数', '慢查询占比'],
                    orient: 'vertical',
                    right: 30,
                    y: 'center',
                    padding: [40, 11, 20, 37]
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    bottom: '5%',
                    // top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxis,
                },
                yAxis: [
                    {
                        type: 'value',
                        // name: '个数'
                        // scale: true,
                    },
                    {
                        type: 'value',
                        // name: '占比',
                        axisLabel: {
                            formatter: '{value}%'
                        }
                        // scale: true,
                    }
                ],
                series: [
                    {
                        data: y1,
                        name: "慢查询次数",
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0, // 主轴
                        xAxisIndex: 0,
                    },
                    {
                        data: y0,
                        name: "失败次数",
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0, // 主轴
                        xAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(220, 106, 144)'
                            }
                        },
                        onClick: handleClick,
                    },
                    {
                        data: y2.map((item: any) => (item * 100).toFixed(2)),
                        name: "失败占比",
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1, // 次轴
                        xAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(235, 130, 165)'
                            }
                        }
                    },
                    {
                        data: y3.map((item: any) => (item * 100).toFixed(2)),
                        name: "慢查询占比",
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1, // 次轴
                        xAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(128, 222, 234)'
                            }
                        }
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {      // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'    // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
            }
            setOptions(options)
            setLoading(false)
        }
        fetchData()
    }, [props.dateSelect])
    useEffect(() => {
        const fetchData = async () => {
            setLoading2(true)
            let xAxis: string[] = []
            let y0: number[] = []
            let y1: number[] = []
            let y2: number[] = []
            let y3: number[] = []
            const data = await linkFetch(JSON.stringify({ data: { isForTimeSeries: true, statDate: props.dateSelect } }))
            if (data && data.data) {
                const sheet = data.data
                // 提取字段queryTime作为x轴
                xAxis = sheet.map((item: any) => item.queryTime)
                // 提取字段failedQueryCount作为y0轴的值
                y0 = sheet.map((item: any) => item.failedQueryCount)
                // 提取字段slowQueryCount作为y0轴的值
                y1 = sheet.map((item: any) => item.slowQueryCount)
                // 提取字段failedQueryRate作为y1轴的值
                y2 = sheet.map((item: any) => item.failedQueryRate)
                // 提取字段slowQueryRate作为y1轴的值
                y3 = sheet.map((item: any) => item.slowQueryRate)
            }
            let options2 = {
                title: {
                    text: '时间趋势',
                    left: 'center',
                },
                legend: {
                    data: ['失败次数', '失败占比', '慢查询次数', '慢查询占比'],
                    orient: 'vertical',
                    right: 30,
                    y: 'center',
                    padding: [40, 11, 20, 37]
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    bottom: '5%',
                    // top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxis,
                },
                yAxis: [
                    {
                        type: 'value',
                        // name: '个数'
                        // scale: true,
                    },
                    {
                        type: 'value',
                        // name: '占比',
                        axisLabel: {
                            formatter: '{value}%'
                        }
                        // scale: true,
                    }
                ],
                series: [
                    {
                        data: y1,
                        name: "慢查询次数",
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0, // 主轴
                        xAxisIndex: 0,
                    },
                    {
                        data: y0,
                        name: "失败次数",
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0, // 主轴
                        xAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(220, 106, 144)'
                            }
                        }
                    },
                    {
                        data: y2.map((item: any) => (item * 100).toFixed(2)),
                        name: "失败占比",
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1, // 次轴
                        xAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: 'rgb(235, 130, 165)'
                            }
                        }
                    },
                    {
                        data: y3.map((item: any) => (item * 100).toFixed(2)),
                        name: "慢查询占比",
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1, // 次轴
                        xAxisIndex: 0,
                        // itemStyle: {
                        //     normal: {
                        //         color: 'rgb(128, 222, 234)'
                        //     }
                        // }
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {      // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'    // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
            }
            setOptions2(options2)
            setLoading2(false)
        }
        fetchData().then(r => {})
    }, [props.dateSelect])

    return (
        <Card>
            <CardBody>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>趋势概览</h1>
                <Spacer y={5} />
                <ReactECharts option={options} showLoading={loading} loadingOption={{ text: '加载中...' }} />
                <Spacer y={3} />
                <ReactECharts option={options2} showLoading={loading2} loadingOption={{ text: '加载中...' }} />
            </CardBody>
        </Card>
    )
}

export default Trend
