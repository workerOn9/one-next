import {useEffect, useState} from "react"
import useSWR from "swr"
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
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from "dayjs"

const header = [
    {
        key: "statDate",
        label: "日期"
    },
    {
        key: "queryEndIn5Min",
        label: "结束时间（每5分钟）"
    },
    {
        key: "count",
        label: "计数"
    },
    {
        key: "first",
        label: "起点"
    },
    {
        key: "last",
        label: "末位"
    }
]

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Extremum() {
    const [dateSelect, setDateSelect] = useState(`${year}${month}${day}`)
    useEffect(() => {
        console.info(dateSelect)
        setDateSelect(dateSelect)
    }, [dateSelect])

    const {
        data,
        isLoading
    } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getExtremePoints?date=${dateSelect}`, fetcher, {
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
                   topContent={<h1>寻找极值</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data ?? []} emptyContent={"没有数据"} isLoading={isLoading}
                           loadingContent={<div style={{display: 'flex', padding: "100px 0", justifyContent: 'center'}}>
                               <CircularProgress color="primary" content="正在加载"/></div>}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryEndIn5Min}>
                            {(columnKey) => {
                                // console.info(columnKey)
                                const obj = getKeyValue(item, columnKey)
                                const obj_type = typeof (obj)
                                return <TableCell>{obj_type === 'object' && (columnKey === 'first' || columnKey === 'last') ? obj.indict : obj}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default Extremum