import {useCallback, useEffect, useMemo, useState} from 'react'
import {
    Button, Chip, Dropdown, DropdownItem,
    DropdownMenu, DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Pagination,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from '@nextui-org/react'
import ShowSQL from './showSQL'

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

async function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getList"
    const res = await fetch(url, {method: 'POST', body})
    return await res.json()
}

function TableList({isDrill, inputQueryIds, inputDate}: {
    isDrill: boolean,
    inputQueryIds?: string[],
    inputDate?: string
}) {
    const [queryIds, setQueryIds] = useState(inputQueryIds)
    const [inputValue, setInputValue] = useState("")
    useEffect(() => {
        setQueryIds(inputQueryIds)
        if (inputQueryIds && inputQueryIds.length > 0) {
            setInputValue(inputQueryIds.join(','))
        }
    }, [inputQueryIds])
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [dataCount, setDataCount] = useState(0)
    /**
     * 输入内容处理
     */
    const contentChange = (e: string) => {
        if (e) {
            inputQueryIds = e.split(',')
            setQueryIds(e.split(','))
        }
    }
    /**
     * queryIds 变化效果
     */
    useEffect(() => {
        if (queryIds && queryIds.length > 0) {
            setInputValue(queryIds.join(','))
        }
        const fetchData = async () => {
            const res = await linkFetch(JSON.stringify({
                data: {
                    statDate: inputDate,
                    queryIdList: inputQueryIds,
                    page: {
                        pageNo: pageNo,
                        pageSize: pageSize
                    }
                }
            }))
            if (res && res.data) {
                if (res.data.total_count && res.data.total_count != dataCount) setDataCount(res.data.total_count)
                setData(res)
            }
        }
        if (!isDrill) {
            fetchData().then(r => {
            })
        } else if (isDrill && queryIds && queryIds.length > 0) {
            fetchData().then(r => {
            })
        }
    }, [queryIds, pageNo])
    /**
     * 提交按钮触发
     */
    const onChangeQueryIds = async () => {
        if (inputDate) {
            if (queryIds) setQueryIds(queryIds)
            const reqBody = JSON.stringify({
                data: {
                    queryIdList: queryIds,
                    statDate: inputDate,
                    page: {
                        pageNo: pageNo,
                        pageSize: pageSize
                    }
                }
            })
            const res = await linkFetch(reqBody)
            if (res && res.data) {
                if (res.data.total_count && res.data.total_count != dataCount) setDataCount(res.data.total_count)
                setData(res)
            }
        }
    }
    const [data, setData] = useState<any>()
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [drillValue, setDrillValue] = useState<string>()
    /**
     * 下钻按钮
     */
    const btnDrillHandler = (e: any, query_id: string) => {
        if (query_id && query_id.length > 0) {
            setDrillValue(query_id)
        }
    }
    /**
     * 复制queryId
     */
    const copyHandler = (e: any, query_id: string) => {
        if (query_id && query_id.length > 0) {
            navigator.clipboard.writeText(query_id)
                .then(() => {
                    console.log(`已复制: ${query_id}`)
                })
                .catch((error) => {
                    console.error(`无法复制到剪贴板: ${error}`)
                })
        }
    }
    /**
     * 字段内容渲染
     */
    const renderCell = useCallback((data: any, columnKey: React.Key) => {
        const cellValue = data[columnKey]
        switch (columnKey) {
            case 'queryId':
                return <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                color='default'
                                variant='light'
                                className="capitalize"
                            >
                                {cellValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dropdown Variants"
                            color='default'
                            variant='faded'
                        >
                            <DropdownItem key="copy" onPress={(e) => {
                                copyHandler(e, cellValue)
                            }}>复制</DropdownItem>
                            <DropdownItem key="sql" onPress={(e) => {
                                btnDrillHandler(e, cellValue)
                                onOpen()
                            }}>查看SQL</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            case 'tableRead':
                return JSON.stringify(cellValue)
            case 'engineType':
                return JSON.stringify(cellValue)
            case 'status':
                return <Chip color={cellValue === 'FAILED' ? 'danger' : 'default'}>
                    {cellValue}
                </Chip>
            default:
                return cellValue
        }
    }, [])
    /**
     * 总页数
     */
    const pages = useMemo(() => {
        return dataCount ? Math.ceil(dataCount / pageSize) : 0
    }, [dataCount, pageSize])
    /**
     * 重置按钮
     */
    const btnResetHandler = () => {
        setQueryIds([])
        setInputValue("")
    }

    return (
        <div>
            {!isDrill &&
                <div style={{display: 'inline', justifyContent: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'start'}}>
                        <Input
                            isClearable={true}
                            label="QueryId 输入"
                            onClear={() => {
                                setQueryIds([])
                                setInputValue("")
                            }}
                            onValueChange={contentChange}
                            labelPlacement="outside-left"
                            description="多个query_id用逗号分隔"
                            placeholder="query_ids..."
                            value={inputValue}
                        />
                    </div>
                    <Spacer y={1}/>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Button color="primary" size="sm" radius="full" variant="flat"
                                onPress={onChangeQueryIds}>提交</Button>
                        <Spacer x={1}/>
                        <Button color="default" size="sm" radius="full" variant="flat"
                                onPress={btnResetHandler}>重置</Button>
                    </div>
                </div>
            }
            <Spacer y={2}/>
            <Table aria-label="table" color="primary" isHeaderSticky={true} isCompact={true}
                   isStriped={true}
                   topContent={!isDrill && <div className="flex justify-between">
                       <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>日志记录</h1>
                       {dataCount > 0 && <div className="flex justify-end">
                           <Pagination
                               size="sm"
                               variant="flat"
                               loop
                               isCompact={false}
                               showControls
                               showShadow
                               color="default"
                               page={pageNo}
                               total={pages}
                               onChange={(page) => setPageNo(page)}
                           />
                       </div>}
                   </div>}
            >
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key} maxWidth={10}
                                            isRowHeader={true}>{column.label}</TableColumn>
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
                                <ShowSQL isDrill={true} inputQueryId={drillValue} inputDate={inputDate}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    完成
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TableList
