import {memo, useEffect, useState} from "react"
import {
    CircularProgress,
    getKeyValue,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"
import useSWR from "swr"
import {DatePicker, DatePickerProps} from "antd"

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

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

function Monitor() {
    const [dateSelect, setDateSelect] = useState('')
    useEffect(() => {
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
        <div style={{padding: "10px 0", maxWidth: '90vw', maxHeight: '90vw', margin: '0 auto'}}>
            <DatePicker onChange={onChange} />
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
                <TableBody items={data?.data ?? []} emptyContent={"没有数据"} isLoading={isLoading} loadingContent={<div style={{ display: 'flex', padding: "100px 0", justifyContent: 'center' }}><CircularProgress color="primary" content="正在加载" /></div>}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryEndIn5Min}>
                            {(columnKey) => {
                                // console.info(columnKey)
                                const obj = getKeyValue(item, columnKey)
                                const obj_type = typeof(obj)
                                return <TableCell>{obj_type === 'object' && (columnKey === 'first' || columnKey === 'last') ? obj.indict : obj}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default memo(Monitor)