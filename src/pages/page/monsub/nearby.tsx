import React, {useEffect, useState} from "react"
import {DatePicker, DatePickerProps} from "antd"
import {
    CircularProgress,
    getKeyValue,
    Spacer,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"
import dayjs from "dayjs"
import useSWR from "swr";

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

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Nearby() {
    const [locale, setLocale] = React.useState<any>()
    React.useEffect(()=> {
        (async ()=> {
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

    const {
        data,
        isLoading
    } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getPointRelatedRecord`, fetcher, {
        keepPreviousData: true,
    })

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(date, dateString)
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    return (
        <div>
            <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale}/>
            <Spacer y={2}/>
            <Table aria-label="table" selectionMode="single" color="success" isHeaderSticky={true} isCompact={true}
                   isStriped={true}
                   topContent={<h1>获取临近记录</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data ?? []} emptyContent={"没有数据"}>
                </TableBody>
            </Table>
        </div>
    )
}

export default Nearby