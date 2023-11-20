import {useCallback, useEffect, useMemo, useState} from 'react'
import {
    Button, Chip, Dropdown, DropdownItem,
    DropdownMenu, DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Pagination, Select, SelectItem,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
    Selection, ScrollShadow, Popover, PopoverTrigger, PopoverContent
} from '@nextui-org/react'
import ShowSQL from './showSQL'
import {GearIcon} from "@/components/GearIcon"

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
    const [slowThreshold, setSlowThreshold] = useState(10000)
    /**
     * select 控件处理
     * 默认筛选失败记录
     */
    const [selectStatus, setSelectStatus] = useState<Selection>(isDrill ? new Set([]) : new Set(['FAILED']))
    /**
     * 是否慢查询
     */
    const [selectIsSlow, setSelectIsSlow] = useState<Selection>(new Set([]))
    /**
     * 错误信息 控件处理
     */
    const [errMsg, setErrMsg] = useState("")
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
                    statusList: Array.from(selectStatus),
                    isSlowQuery: Array.from(selectIsSlow) && Array.from(selectIsSlow).length > 0 ? (Array.from(selectIsSlow))[0] : null,
                    errorMsgSearch: errMsg === '' ? null : errMsg,
                    slowQueryThreshold: slowThreshold,
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
    }, [queryIds, pageNo, inputDate])
    /**
     * 错误信息内容处理
     */
    const errContentChange = (e: string) => {
        if (e) {
            setErrMsg(e)
        }
    }
    /**
     * 分页信息处理
     */
    const validatePageSize = (value: any) => value.toString().match(/^[1-9]\d*$/i)
    const onChangePageSize = (e: any) => {
        if (!isNaN(e)) setPageSize(e)
    }
    const isPageSizeValidated = useMemo(() => {
        if (!pageSize) return false
        return !!validatePageSize(pageSize)
    }, [pageSize])
    /**
     * 慢查询阈值处理
     */
    const validateSlowThreshold = (value: any) => value.toString().match(/^[1-9]\d*$/i)
    const onChangeSlowThreshold = (e: any) => {
        if (!isNaN(e)) setSlowThreshold(e)
    }
    const isSlowThresholdValidated = useMemo(() => {
        if (!slowThreshold) return false
        return !!validateSlowThreshold(slowThreshold)
    }, [slowThreshold])
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
                    statusList: Array.from(selectStatus),
                    isSlowQuery: Array.from(selectIsSlow) && Array.from(selectIsSlow).length > 0 ? (Array.from(selectIsSlow))[0] : null,
                    errorMsgSearch: errMsg === '' ? null : errMsg,
                    slowQueryThreshold: slowThreshold,
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
     * dropdown相关
     */
    const [dropDownKey, setDropDownKey] = useState('')
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
                                setDropDownKey('copy')
                                copyHandler(e, cellValue)
                            }}>复制</DropdownItem>
                            <DropdownItem key="sql" onPress={(e) => {
                                btnDrillHandler(e, cellValue)
                                setDropDownKey('sql')
                                onOpen()
                            }}>查看SQL</DropdownItem>
                            <DropdownItem key="plan" onPress={(e) => {
                                btnDrillHandler(e, cellValue)
                                setDropDownKey('plan')
                                onOpen()
                            }}>查看执行计划</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            case 'tableRead':
                return <ScrollShadow hideScrollBar visibility="auto" className="max-h-fit">
                    <div style={{maxHeight: 80}}>{cellValue && cellValue.map((v: any) => {
                        return <p key={v}>{v}</p>
                    })}</div>
                </ScrollShadow>
            case 'engineType':
                return <div>
                    {cellValue.map((v: any) => {
                        return <><Chip color='default' variant='bordered'>{v}</Chip><Spacer y={1}/></>
                    })}
                </div>
            case 'status':
                return <Chip color={cellValue === 'FAILED' ? 'danger' : 'default'}>
                    {cellValue === 'FAILED' ? '失败' : '成功'}
                </Chip>
            case 'duration':
                return cellValue >= slowThreshold ? <span style={{color: "hotpink"}}>{cellValue}</span> :
                    <span style={{color: "darkgreen"}}>{cellValue}</span>
            case 'errorMsg':
                return <ScrollShadow hideScrollBar visibility="auto" className="max-h-fit">
                    <div style={{maxHeight: 80, maxWidth: 200}}>{cellValue}</div>
                </ScrollShadow>
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
        setSelectStatus(new Set([]))
        setSelectIsSlow(new Set([]))
        setPageNo(1)
        setPageSize(10)
        setSlowThreshold(10000)
    }

    return (
        <div>
            {!isDrill &&
                <div style={{display: 'inline', justifyContent: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'start'}}>
                        <Input
                            isClearable={true}
                            label="query_id"
                            onClear={() => {
                                setQueryIds([])
                                setInputValue("")
                            }}
                            onValueChange={contentChange}
                            labelPlacement="inside"
                            description="多个query_id用逗号分隔"
                            className="max-w-fit"
                            value={inputValue}
                        />
                        <Spacer x={1}/>
                        <Select label="状态" selectionMode="multiple" className="max-w-fit" description="默认选择成功"
                                selectedKeys={selectStatus} onSelectionChange={setSelectStatus}>
                            <SelectItem key="SUCCESS" value="SUCCESS">成功</SelectItem>
                            <SelectItem key="FAILED" value="FAILED">失败</SelectItem>
                        </Select>
                        <Spacer x={1}/>
                        <Select label="慢查询" selectionMode="multiple" className="max-w-fit"
                                description="是否慢查询(默认阈值10秒)"
                                selectedKeys={selectIsSlow} onSelectionChange={setSelectIsSlow}>
                            <SelectItem key="true" value="true">是</SelectItem>
                            <SelectItem key="false" value="false">否</SelectItem>
                        </Select>
                        <Spacer x={1}/>
                        <Input
                            isClearable={true}
                            label="错误信息"
                            onClear={() => setErrMsg("")}
                            onValueChange={errContentChange}
                            labelPlacement="inside"
                            description="信息内容模糊匹配"
                            className="max-w-fit"
                            value={errMsg}
                        />
                    </div>
                    <Spacer y={1}/>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Button color="primary" size="sm" radius="full" variant="flat"
                                onPress={onChangeQueryIds}>提交</Button>
                        <Spacer x={1}/>
                        <Button color="default" size="sm" radius="full" variant="flat"
                                onPress={btnResetHandler}>重置</Button>
                        <Spacer x={1}/>
                        <Popover placement="top" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button isIconOnly color="warning" size="sm" radius="full"
                                        variant="light"><GearIcon/></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[240px]">
                                {(titleProps) => (
                                    <div className="px-1 py-2 w-full">
                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                            其他设置
                                        </p>
                                        <div className="mt-2 flex flex-col gap-2 w-full">
                                            <Input value={slowThreshold.toString()}
                                                   onValueChange={onChangeSlowThreshold} label="慢查询阈值(毫秒)"
                                                   size="sm" variant="bordered"
                                                   isRequired isInvalid={!isSlowThresholdValidated}
                                                   errorMessage={!isSlowThresholdValidated && "请输入大于0的数字"}
                                            />
                                            <Input value={pageSize.toString()} onValueChange={onChangePageSize}
                                                   label="分页大小" size="sm" variant="bordered"
                                                   isRequired isInvalid={!isPageSizeValidated}
                                                   errorMessage={!isPageSizeValidated && "请输入大于0的数字"}
                                            />
                                        </div>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            }
            <Spacer y={2}/>
            <Table aria-label="table" color="primary" isHeaderSticky={true} isCompact={true}
                   isStriped={true}
                   topContent={!isDrill && <div className="flex justify-between">
                       <h1 style={{fontSize: '20px', fontWeight: 'bold'}}>日志记录</h1>
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
                            <ModalHeader
                                className="flex flex-col gap-1">{dropDownKey && dropDownKey === 'plan' ? '执行计划' : 'SQL'}</ModalHeader>
                            <ModalBody>
                                {dropDownKey && dropDownKey === 'plan' ?
                                    <ShowSQL isDrill={true} inputQueryId={drillValue} inputDate={inputDate}
                                             isForPlan={true}/> :
                                    <ShowSQL isDrill={true} inputQueryId={drillValue} inputDate={inputDate}/>}
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
