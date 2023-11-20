import React, { useEffect, useState } from "react"
import {
    Button, Chip,
    getKeyValue,
    Spacer,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"
import TableList from "./tableList"

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

async function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getPointRelatedRecord"
    const res = await fetch(url, {method: 'POST', body})
    return await res.json()
}

function Nearby({ inputPoints, inputDate}: {inputPoints?: string[], inputDate?: string}) {
    const [requestBody, setRequestBody] = useState<any>(JSON.stringify({
        data: {
            indicts: [],
            statDate: inputDate
        }
    }))
    const [queryIds, setQueryIds] = useState<string[]>([])
    const [allKeys, setAllKeys] = useState<string[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await linkFetch(JSON.stringify({
                data: {
                    indicts: inputPoints,
                    statDate: inputDate
                }
            }))
            if (res && res.data && res.data.list) {
                setData(res.data)
                setAllKeys(res.data.all)
            }
        }
        if (inputPoints && inputPoints.length > 0 && inputDate) {
            setRequestBody(JSON.stringify({
                data: {
                    indicts: inputPoints,
                    statDate: inputDate
                }
            }))
            fetchData().then(r => {})
        } else {
            setRequestBody(requestBody)
        }
    }, [requestBody])
    useEffect(() => {
        if (inputPoints && inputPoints.length > 0) {
            setQueryIds(inputPoints)
        }
        setQueryIds(queryIds)
    }, [queryIds])
    const [data, setData] = useState<any>()
    const [selectedKeys, setSelectedKeys] = useState(new Set([]))
    const [selectedQueryIds, setSelectedQueryIds] = useState<string[]>([])

    // 按钮响应
    const btnHandler = () => {
        const keys = selectedKeys.toString() === 'all' ? allKeys : Array.from(selectedKeys)
        const result = keys.join(",")
        if (keys && keys.length > 0) {
            setSelectedQueryIds([...keys])
        }
        navigator.clipboard.writeText(result)
            .then(() => {
                console.log(`已复制: ${result}`)
            })
            .catch((error) => {
                console.error(`无法复制到剪贴板: ${error}`)
            })
    }

    useEffect(() => {
        if (selectedQueryIds && selectedQueryIds.length > 0) {
            setSelectedQueryIds(selectedQueryIds)
        }
    }, [selectedKeys])

    return (
        <div>
            <Table aria-label="table" selectionMode="multiple" color="primary" isHeaderSticky={true} isCompact={true}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys: any) => {
                    setSelectedKeys(keys)
                }}
                isStriped={true}
                topContent={<h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>邻近记录</h1>}>
                <TableHeader columns={header}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key}>{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.list ?? []} emptyContent={"没有数据"}>
                    {(item: any) => {
                        // console.info(item)
                        return <TableRow key={item.queryId}>
                            {(columnKey) => {
                                // console.info(columnKey)
                                if (columnKey === 'status') {
                                    return <TableCell><Chip
                                        color={getKeyValue(item, columnKey) === 'FAILED' ? 'danger' : 'default'}>
                                        {getKeyValue(item, columnKey) === 'FAILED' ? '失败' : '成功'}
                                    </Chip></TableCell>
                                }
                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
            <Spacer y={1} />
            {(inputPoints && inputPoints.length > 0 && inputDate) && <Button color="success" size="sm" radius="full" variant="flat" onPress={btnHandler}>展开详情</Button>}
            <Spacer y={2} />
            {selectedQueryIds && selectedQueryIds.length > 0 && <TableList isDrill={true} inputQueryIds={selectedQueryIds} inputDate={inputDate}/>}
        </div>
    )
}

export default Nearby