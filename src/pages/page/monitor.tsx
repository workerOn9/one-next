import {memo, useEffect, useState} from "react";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const rows = [
    {
        key: "0",
        statDate: "20230919",
        queryEndIn5Min: "2023-09-19 11:05:00",
        count: 5
    },
    {
        key: "1",
        statDate: "20230919"
    }
]

function Monitor() {
    // const {
    //     data,
    //     isLoading
    // } = useSWR(`https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getExtremePoints`, fetcher)

    return (
        <div style={{maxWidth: '90vw', margin: '0 auto'}}>
            <Table aria-label="table" selectionMode="single" color="success" isHeaderSticky={true} isCompact={true}
                   isStriped={true}
                   topContent={<div>Sheet</div>}>
                <TableHeader>
                    <TableColumn isRowHeader={true}>queryEndIn5Min</TableColumn>
                    <TableColumn isRowHeader={true}>count</TableColumn>
                    <TableColumn isRowHeader={true}>first</TableColumn>
                    <TableColumn isRowHeader={true}>last</TableColumn>
                    <TableColumn isRowHeader={true}>statDate</TableColumn>
                </TableHeader>
                <TableBody items={rows}>
                    {(item: any) => {
                        console.info(item)
                        return <TableRow key={item.key}>
                            {(columnKey) => {
                                console.info(columnKey)
                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    }}
                </TableBody>
            </Table>
        </div>
    )
}

export default memo(Monitor)