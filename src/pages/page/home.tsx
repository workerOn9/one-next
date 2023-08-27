import useSWR from 'swr'
import { Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { useEffect, useState } from 'react'

const defaultSql = "select 1 as test"

export default function Query() {
    const [sql, setSql] = useState('select 1 as test')
    const sqlChangeHandler = (e: any) => {
        setSql(e)
    }

    const fetcher = async (sql: {}) => {
        console.log(sql)
        const res = await fetch("/api/pg", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(sql),
            redirect: 'follow'
        }).then((result) => result)
        // console.log(res)
        const data = res.ok ? res.json() : undefined
        // console.log(data)
        return data
    }

    const data = fetcher({ sql: (sql as string) })
    const [header, setHeader] = useState()
    const [datasheet, setDatasheet] = useState()
    useEffect(() => {
        const sheet = data.then((res) => {
            const s = res.sheet
            setHeader(s.header)
            setDatasheet(s.data)
        })
        console.log(sheet)
        console.log(header)
        console.log(datasheet)
    }, [])

    return (
        <div>
            <Textarea
                label="SQL"
                labelPlacement="inside"
                placeholder="select hello from world"
                maxRows={20}
                fullWidth={true}
                onValueChange={sqlChangeHandler}
            />
            <Spacer x={4} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="shadow" color="success" size="sm">查询</Button>
            </div>
            <Spacer y={4} />
            {header && datasheet && <Table aria-label="table">
                <TableHeader columns={header}>
                    {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={datasheet}>
                    {(item: any) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
        </div>
    )
}
