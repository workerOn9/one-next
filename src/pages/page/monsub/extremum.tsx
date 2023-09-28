import React, {useEffect, useState} from "react"
import useSWR from "swr"
import {DatePicker, DatePickerProps} from "antd"
import {
    Button,
    Chip,
    CircularProgress,
    getKeyValue,
    Spacer,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow, Tooltip
} from "@nextui-org/react"
import dayjs from "dayjs"

const columns = [
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
        key: "errorPoint",
        label: "错误点"
    }
]

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Extremum() {
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
        // console.info(dateSelect)
        setDateSelect(dateSelect)
    }, [dateSelect])
    // 获取API数据
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
    // 按钮响应
    const btnHandler = (e: any, points: string[]) => {
        console.info(points)
    }

    const renderCell = React.useCallback((data: any, columnKey: React.Key) => {
        const cellValue = data[columnKey]
        // console.info(data, columnKey, data[columnKey])
        switch (columnKey) {
            case "errorPoint":
                // console.log(data['first'])
                const first_point = data['first']['queryId']
                // const first_duration = data['first']['duration']
                const first_indict = data['first']['indict']
                const last_point = data['last']['queryId']
                // const last_duration = data['last']['duration']
                const last_indict = data['last']['indict']
                let points = [first_indict]
                if (first_point && last_point && last_point != first_point) points.push(last_indict)
                return <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    {first_point && <Chip color="warning" variant="flat">{first_indict}</Chip>}
                    {first_point && last_point && first_point != last_point && <Spacer x={1}/>}
                    {first_point && last_point && first_point != last_point &&
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            <Chip color="default" variant="light">...</Chip>
                            <Spacer x={1}/>
                            <Chip color="warning" variant="flat">{last_indict}</Chip>
                        </div>}
                    <Spacer x={4}/>
                    <Button color="success" size="sm" radius="full" variant="flat" onPress={(e) => btnHandler(e, points)}>
                        查看
                    </Button>
                </div>
            default:
                return cellValue
        }
    }, [])

    return (
        <div>
            <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale}/>
            <Spacer y={2}/>
            <Table aria-label="table"
                   // selectionMode="single"
                   color="success" isHeaderSticky={true} isCompact={true}
                   isStriped={true}
                   topContent={<h1>寻找极值</h1>}>
                <TableHeader columns={columns}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key} align="start">{column.label}</TableColumn>
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
                                return <TableCell>{renderCell(item, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default Extremum