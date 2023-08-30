import { Button, Chip, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { useEffect, useState } from 'react'

export default function Query() {
    // SQL
    const [sql, setSql] = useState("select 'world' as hello")
    const sqlChangeHandler = (e: any) => {
        setSql(e)
    }
    // 接入API
    const fetcher = async (sql: {}) => {
        const res = await fetch("/api/pgclient", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(sql),
            redirect: 'follow'
        }).then((result) => result)
        const data = res.ok ? res.json() : undefined
        return data
    }
    const [header, setHeader] = useState()
    const [datasheet, setDatasheet] = useState()
    // 按钮事件处理
    const clickHandler = () => {
        const data = fetcher({ sql: (sql as string) })
        if (data) {
            data.then((res) => {
                const s = res.sheet
                setHeader(s.header)
                setDatasheet(s.data)
            })
        }
    }
    // 渲染
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
                <Chip size="sm" variant="light" style={{ fontSize: '10px' }}>默认 LIMIT 10</Chip>
                <Spacer x={2} />
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
