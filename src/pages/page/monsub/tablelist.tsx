import { useEffect, useState } from 'react'
import dayjs from "dayjs"
// import useSWR from "swr"
import { Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from '@nextui-org/react'
import { DatePicker, DatePickerProps } from 'antd'

const header = [
    {
        key: "status",
        label: "状态"
    },
    {
        key: "queryId",
        label: "query_id"
    },
    {
        key: "queryStart",
        label: "开始时间"
    },
    {
        key: "queryEnd",
        label: "结束时间"
    },
    {
        key: "duration",
        label: "耗时(ms)"
    },
    {
        key: "tableRead",
        label: "读表"
    },
    {
        key: "engineType",
        label: "引擎"
    },
    {
        key: "cpuTime",
        label: "cpu时间(ms)"
    },
    {
        key: "memoryUse",
        label: "内存消耗(mb)"
    },
    {
        key: "shuffleUse",
        label: "shuffle消耗(mb)"
    },
    {
        key: "physicalReads",
        label: "物理读"
    },
    {
        key: "errorMsg",
        label: "错误信息"
    },
    {
        key: "sessionId",
        label: "session id"
    },
    {
        key: "sessionStart",
        label: "session开始时间"
    }
]

interface requestData {
    data: dataProps
}

interface dataProps {
    statDate: string,
    startTime?: string,
    endTime?: string,
    queryIdList?: string[],
    statusList?: string[],
    errorMsgSearch?: string,
    page: Page,
    sortTypeList?: string[]
}

interface Page {
    pageNo: number | 1,
    pageSize: number | 20
}

// const fetcher = (url: string, body: any) => fetch(url, { method: 'POST', body }).then((res) => res.json()).finally(() => { console.log(body) })

function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getList"
    return fetch(url, { method: 'POST', body }).then((res) => res.json())
}

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Tablelist() {
    const [locale, setLocale] = useState<any>()
    useEffect(() => {
        (async () => {
            const zh_CN = (await import('antd/es/date-picker/locale/zh_CN')).default
            const en_US = (await import('antd/es/date-picker/locale/en_US')).default
            setLocale(zh_CN)
        })()
    }, [])

    const [dateSelect, setDateSelect] = useState(`${year}${month}${day}`)
    useEffect(() => {
        console.info(dateSelect)
        setDateSelect(dateSelect)
    }, [dateSelect])

    const [requestBody, setRequestBody] = useState<any>(JSON.stringify({
        data: {
            statDate: dateSelect,
            queryIdList: [],
            page: {
                pageNo: 1,
                pageSize: 20
            }
        }
    }))
    const [queryIds, setQueryIds] = useState<string[]>([])
    // useEffect(() => {
    //     console.log(requestBody)
    //     setRequestBody(requestBody)
    // }, [requestBody])
    useEffect(() => {
        setQueryIds(queryIds)
    }, [queryIds])
    const contentChange = (e: string) => {
        if (e) {
            console.log(e)
            setQueryIds(e.split(','))
        }
    }

    const onChangeQueryIds = async () => {
        // console.log(queryIds)
        if (queryIds && dateSelect) {
            // console.log(queryIds, dateSelect)
            setDateSelect(dateSelect)
            setQueryIds(queryIds)
            setRequestBody(JSON.stringify({
                data: {
                    queryIdList: queryIds,
                    statDate: dateSelect,
                    page: {
                        pageNo: 1,
                        pageSize: 20
                    }
                }
            }))
            const res = await linkFetch(requestBody)
            if (res && res.data) setData(res)
        }
    }

    // const {
    //     data,
    //     isLoading
    // } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getList`, (url) => fetcher(url, requestBody), {
    //     // keepPreviousData: true,
    // })

    const [data, setData] = useState<any>()
    useEffect(() => {
        setData(data)
    }, [data])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(date, dateString)
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    return (
        <div>
            <div>
                <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale} />
                <Spacer y={2} />
                <div style={{ display: 'inline', justifyContent: 'center' }}>
                    <Textarea label="QueryId" labelPlacement="inside" minRows={1} onValueChange={contentChange} fullWidth={false}/>
                    <Spacer y={1} />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color="primary" size="sm" radius="full" variant="flat" onPress={onChangeQueryIds}>Summit</Button>
                    </div>
                </div>
                {/* <Spacer y={2} />
                <Card><CardBody>{JSON.stringify(requestBody)}</CardBody></Card> */}
            </div>
            <Spacer y={2} />
            <Table aria-label="table" selectionMode="single" color="primary" isHeaderSticky={true} isCompact={true}
                isStriped={true}
                topContent={<h1>获取日志记录</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data?.total_datas ?? []} emptyContent={"没有数据"}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryId}>
                            {(columnKey) => {
                                const obj = getKeyValue(item, columnKey)
                                // console.info(columnKey)
                                if (columnKey === 'tableRead' || columnKey === 'engineType') {
                                    // obj = JSON.stringify(obj)
                                    return <TableCell>{JSON.stringify(obj)}</TableCell>
                                }
                                return <TableCell>{obj}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default Tablelist
