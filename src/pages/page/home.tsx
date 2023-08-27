import useSWR from 'swr'
import { Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { useEffect, useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Query() {
    const [sql, setSql] = useState('select 1 as test')
    const sqlChangeHandler = (e: any) => {
        setSql(e.target.value)
    }

    const { data, error, isLoading, mutate } = useSWR('/api/pg', fetcher)
    const [header, setHeader] = useState()
    const [datasheet, setDatasheet] = useState()
    useEffect(() => {
        // console.log(data)
        if (data) {
            setHeader(data.sheet.header)
            setDatasheet(data.sheet.data)
        }
        // console.log(header)
        // console.log(datasheet)
    }, [data, header, datasheet])

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
            {data && header && datasheet && <Table aria-label="table">
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
