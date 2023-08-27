import useSWR from 'swr'
import { Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { useEffect, useState } from 'react'

const defaultSql = "select 1 as test"

// async function fetcher(sql: string) {
//     var myHeaders = new Headers()
//     myHeaders.append("Content-Type", "application/json")
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: sql
//     }
//     const res = await fetch("http://localhost:3000/api/pg", requestOptions)
//         .then((res) => res.json())
//         .catch(error => console.log('error', error))
//     return res ? res.data : {}
// }

export default function Query() {
    const [sql, setSql] = useState('select 1 as test')
    const sqlChangeHandler = (e: any) => {
        setSql(e.target.value)
    }

    const fetcher = async (sql: any) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: sql,
            redirect: 'follow'
        }
        console.log(requestOptions)
        const res = await fetch("http://localhost:3000/api/pg", requestOptions as any).then((result) => {
            result.json
        })
        console.log(res)
        const data = res ? (res as any).sheet : {}
        return data
    }

    // const { data, error, isLoading, mutate } = useSWR('/api/pg', fetcher)
    const data = fetcher({ sql: (sql as string) })
    const [header, setHeader] = useState()
    const [datasheet, setDatasheet] = useState()
    useEffect(() => {
        console.log(data)
        if (data) {
            setHeader((data as any).header)
            setDatasheet((data as any).data)
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
