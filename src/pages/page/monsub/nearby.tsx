import React, { useEffect, useState } from "react"
import { DatePicker, DatePickerProps } from "antd"
import {
    Button,
    getKeyValue,
    Spacer,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Textarea
} from "@nextui-org/react"
import dayjs from "dayjs"
// import useSWR from "swr"

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
        key: "sessionStart",
        label: "session开始时间"
    }
]

interface requestData {
    data: dataProps
}

interface dataProps {
    indicts: string[],
    statDate: string
}

// const fetcher = (url: string, body: any) => fetch(url, { method: 'POST', body }).then((res) => res.json())

function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getPointRelatedRecord"
    return fetch(url, { method: 'POST', body }).then((res) => res.json())
}

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Nearby() {
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
        // console.info(dateSelect)
        setDateSelect(dateSelect)
    }, [dateSelect])

    const [requestBody, setRequestBody] = useState<any>(JSON.stringify({
        data: {
            indicts: [],
            statDate: dateSelect
        }
    }))
    const [queryIds, setQueryIds] = useState<string[]>([])
    // useEffect(() => {
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
                    indicts: queryIds,
                    statDate: dateSelect
                }
            }))
            const res = await linkFetch(requestBody)
            if (res && res.data) setData(res)
        }
    }

    // const {
    //     data,
    //     isLoading
    // } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getPointRelatedRecord`, (url) => fetcher(url, requestBody), {
    //     keepPreviousData: true,
    // })
    const [data, setData] = useState<any>()
    useEffect(() => {
        setData(data)
    }, [data])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(date, dateString)
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    const [selectedKeys, setSelectedKeys] = useState(new Set([]))
    useEffect(() => {
        // console.info(selectedKeys)
        setSelectedKeys(selectedKeys)
    }, [selectedKeys])

    // 按钮响应
    const btnHandler = () => {
        // console.log(selectedKeys)
        const result = Array.from(selectedKeys).join(",")
        navigator.clipboard.writeText(result)
            .then(() => {
                console.log("已复制: {}", result)
            })
            .catch((error) => {
                console.error("无法复制到剪贴板:", error)
            })
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
                    <Button color="success" size="sm" radius="full" variant="flat" onPress={btnHandler}>COPY</Button>
                    </div>
                </div>
            </div>
            <Spacer y={2} />
            <Table aria-label="table" selectionMode="multiple" color="primary" isHeaderSticky={true} isCompact={true}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys: any) => {
                    console.info(keys)
                    setSelectedKeys(keys)
                    console.info(selectedKeys)
                }}
                isStriped={true}
                topContent={<h1>获取临近记录</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data ?? []} emptyContent={"没有数据"}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryId}>
                            {(columnKey) => {
                                // console.info(columnKey)
                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default Nearby