import { useCallback, useEffect, useState } from 'react'
import dayjs from "dayjs"
// import useSWR from "swr"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue, useDisclosure } from '@nextui-org/react'
import { DatePicker, DatePickerProps } from 'antd'
import Showsql from './showsql'

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
    },
    {
        key: "tableRead",
        label: "读表"
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

function Tablelist(isDrill: boolean, inputQueryIds?: string[], inputDate?: string) {

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
            statDate: dateSelect,
            queryIdList: [],
            page: {
                pageNo: 1,
                pageSize: 20
            }
        }
    }))
    const [queryIds, setQueryIds] = useState<string[]>([])
    useEffect(() => {
        // console.log(requestBody)
        setRequestBody(requestBody)
    }, [requestBody])
    useEffect(() => {
        setQueryIds(queryIds)
    }, [queryIds])
    const contentChange = (e: string) => {
        if (e) {
            // console.log(e)
            setQueryIds(e.split(','))
        }
    }
    useEffect(() => {
        if (inputQueryIds || inputDate) {
            console.log(inputQueryIds, inputDate)
        }
        const fetchData = async () => {
            const res = await linkFetch(JSON.stringify({
                data: {
                    statDate: inputDate,
                    queryIdList: inputQueryIds,
                    page: {
                        pageNo: 1,
                        pageSize: 20
                    }
                }
            }))
            if (res && res.data) setData(res)
        }
        if (inputQueryIds && inputQueryIds.length > 0 && inputDate) {
            fetchData()
        }
    }, [inputQueryIds])

    const onChangeQueryIds = async () => {
        // console.log(queryIds)
        if (queryIds && dateSelect) {
            // console.log(queryIds, dateSelect)
            setDateSelect(dateSelect)
            setQueryIds(queryIds)
            const reqBody = JSON.stringify({
                data: {
                    queryIdList: queryIds,
                    statDate: dateSelect,
                    page: {
                        pageNo: 1,
                        pageSize: 20
                    }
                }
            })
            setRequestBody(reqBody)
            const res = await linkFetch(reqBody)
            if (res && res.data) setData(res)
        }
    }

    const [data, setData] = useState<any>()
    useEffect(() => {
        setData(data)
    }, [data])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(date, dateString)
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [drillValue, setDrillValue] = useState<string>()
    useEffect(() => {
        setDrillValue(drillValue)
    }, [drillValue])
    const btnDrillHandler = (e: any, query_id: string) => {
        if (query_id && query_id.length > 0) {
            console.log(query_id)
            setDrillValue(query_id)
        }
    }

    const renderCell = useCallback((data: any, columnKey: React.Key) => {
        const cellValue = data[columnKey]
        switch (columnKey) {
            case 'queryId':
                return <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <span>{cellValue}</span>
                    <Spacer x={2} />
                    <Button className="max-w-fit" size="sm" radius="full"
                        onPress={(e) => {
                            btnDrillHandler(e, cellValue)
                            onOpen()
                        }}
                    >
                        SQL
                    </Button>
                </div>
            case 'tableRead':
                return JSON.stringify(cellValue)
            case 'engineType':
                return JSON.stringify(cellValue)
            default:
                return cellValue
        }
    }, [])

    return (
        <div>
            {!isDrill && <div>
                <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale} />
                <Spacer y={2} />
                <div style={{ display: 'inline', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
                    <Input
                        isClearable={true}
                        label="QueryId 输入"
                        onClear={() => setQueryIds([])}
                        onValueChange={contentChange}
                        labelPlacement="outside-left"
                        description="多个query_id用逗号分隔"
                        placeholder="query_ids..."
                    />
                    </div>
                    <Spacer y={1} />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color="primary" size="sm" radius="full" variant="flat" onPress={onChangeQueryIds}>提交</Button>
                    </div>
                </div>
                {/* <Spacer y={2} />
                <Card><CardBody>{JSON.stringify(requestBody)}</CardBody></Card> */}
            </div>}
            <Spacer y={2} />
            <Table aria-label="table" color="primary" isHeaderSticky={true} isCompact={true}
                isStriped={true}
                topContent={<h1>获取日志记录</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key} maxWidth={10} isRowHeader={true}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data?.total_datas ?? []} emptyContent={"没有数据"}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryId}>
                            {(columnKey) => {
                                return <TableCell>{renderCell(item, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onClose={onOpenChange} placement="auto" size='5xl' scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">SQL</ModalHeader>
                            <ModalBody>
                                {Showsql(true, drillValue, dateSelect)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    关闭
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Tablelist
