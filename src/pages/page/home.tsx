import { Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { useEffect, useState } from 'react'

export default function Query() {
    const [sql, setSql] = useState("select 'world' as hello")
    const sqlChangeHandler = (e: any) => {
        setSql(e)
    }

    const fetcher = async (sql: {}) => {
        // console.log(sql)
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
    const [header, setHeader] = useState()
    const [datasheet, setDatasheet] = useState()
    const clickHandler = () => {
        // console.log(sql)
        const data = fetcher({ sql: (sql as string) })
        if (data) {
            data.then((res) => {
                const s = res.sheet
                setHeader(s.header)
                setDatasheet(s.data)
            })
        }
    }

    useEffect(() => {
        setHeader(header)
        setDatasheet(datasheet)
    }, [header, datasheet])

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
                <Button
                    variant="shadow"
                    color="success"
                    size="sm"
                    onPress={clickHandler}
                >查询</Button>
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
