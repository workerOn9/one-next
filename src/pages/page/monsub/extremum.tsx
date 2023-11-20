import React, { useState } from "react"
import useSWR from "swr"
import {
    Button,
    Chip,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@nextui-org/react"
import Nearby from "./nearby"

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
        label: "异常点"
    }
]

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

function Extremum({ dateSelect, onCopyChange} : { dateSelect: string, onCopyChange: (parameter: any) => void}) {
    // 获取API数据
    const {
        data,
        isLoading
    } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getExtremePoints?date=${dateSelect}`, fetcher, {
        keepPreviousData: true,
    })

    const [drillValues, setDrillValues] = useState<string[]>([])
    // 复制queryId
    const btnHandler = (e: any, points: string[]) => {
        // console.info(points.join(","))
        const result = points.join(",")
        navigator.clipboard.writeText(result)
            .then(() => {
                onCopyChange(result)
                console.log(`已复制: ${result}`)
            })
            .catch((error) => {
                console.error(`无法复制到剪贴板: ${error}`)
            })
    }
    // 下钻透视
    const btnDrillHandler = (e: any, points: string[], date: string) => {
        if (points && points.length > 0) {
            setDrillValues(points)
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const renderCell = React.useCallback((data: any, columnKey: React.Key) => {
        const cellValue = data[columnKey]
        switch (columnKey) {
            case "errorPoint":
                const first_point = data['first']['queryId']
                const first_indict = data['first']['indict']
                const last_point = data['last']['queryId']
                const last_indict = data['last']['indict']
                let points = [first_indict]
                if (first_point && last_point && last_point != first_point) points.push(last_indict)
                return <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button className="max-w-fit" size="sm" radius="full" onPress={(e) => {
                        btnDrillHandler(e, points, dateSelect)
                        onOpen()
                    }}>透视</Button>
                    <Spacer x={2} />
                    {first_point && <Chip color="warning" variant="flat" onClick={(e) => btnHandler(e, points)}>{first_point}</Chip>}
                    {first_point && last_point && first_point != last_point && <Spacer x={1} />}
                    {first_point && last_point && first_point != last_point &&
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Chip color="default" variant="light">...</Chip>
                            <Spacer x={1} />
                            <Chip color="warning" variant="flat" onClick={(e) => btnHandler(e, points)}>{last_point}</Chip>
                        </div>}
                </div>
            default:
                return cellValue
        }
    }, [])

    return (
        <div>
            <Table aria-label="table"
                // selectionMode="single"
                color="success" isHeaderSticky={true} isCompact={true}
                isStriped={true}
                topContent={<h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>极值</h1>}>
                <TableHeader columns={columns}>
                    {(column) => {
                        // console.info(column)
                        return <TableColumn key={column.key} align="start">{column.label}</TableColumn>
                    }}
                </TableHeader>
                <TableBody items={data?.data ?? []} emptyContent={"没有数据"} isLoading={isLoading}
                    loadingContent={<div style={{ display: 'flex', padding: "100px 0", justifyContent: 'center' }}>
                        <CircularProgress color="primary" content="正在加载" /></div>}>
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
            <Modal isOpen={isOpen} onClose={onOpenChange} placement="auto" backdrop="blur" size="5xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">透视</ModalHeader>
                            <ModalBody>
                                <Nearby inputPoints={drillValues} inputDate={dateSelect} />
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

export default Extremum