import { Button, Card, CardBody, Chip, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, getKeyValue } from "@nextui-org/react"
import { memo, useEffect, useState } from 'react'
import JsonView from "react18-json-view"
import 'react18-json-view/src/style.css'

function Query() {
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
    const [astJson, setAstJson] = useState()
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
    // sqlParser
    const parserFetch = async (req: {}) => {
        const res = await fetch("/api/sqlparse", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(req),
            redirect: 'follow'
        })
        return res.ok ? res.json() : undefined
    }
    // parser按钮
    const parserClickHandler = () => {
        const data = parserFetch({ sql: (sql as string) })
        if (data) {
            data.then((res) => {
                setAstJson(res)
            })
        }
    }
    // 渲染
    useEffect(() => {
        setAstJson(astJson)
    }, [astJson])

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
                    variant="faded"
                    color="default"
                    size="sm"
                    onPress={parserClickHandler}
                >
                    解析
                </Button>
                <Spacer x={1} />
                <Button
                    variant="shadow"
                    color="success"
                    size="sm"
                    onPress={clickHandler}
                >
                    查询
                </Button>
            </div>
            <Spacer y={4} />
            {header && datasheet && <div>Sheet<Table aria-label="table">
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
            </Table></div>}
            <Spacer y={4} />
            {astJson && <div>AST<Card style={{ padding: '10px 10px', width: '100%' }}>
                <CardBody>
                    <JsonView src={astJson} collapsed={1} />
                </CardBody>
            </Card></div>}
        </div>
    )
}

export default memo(Query)