import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

type sheet = {
    header?: headers[],
    data?: datas[]
}

type headers = {
    key: string,
    label: string
}

type datas = {
    key: string,
    [key: string]: string
}

const defaultSql = "select 1 as test, current_date::text as today"

export default async function handle1(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    let contenct = req.body ? req.body.sql : defaultSql
    const result = await prisma.$queryRawUnsafe(contenct)
    const sheet = dataHandler(result)
    res.status(200).json({ sheet })
}

function dataHandler(data: any): sheet {
    // console.log(data)
    const s: sheet = {}
    if (data) {
        const res = data
        const header = res[0]
        const columns = Object.keys(header)
        const headers = columns.map((col) => {
            const headerItem: headers = {
                key: col,
                label: col
            }
            return headerItem
        })
        // console.log(headers)
        s.header = headers
        const datas = res.map((item: any, index: number) => {
            const dataItem: datas = {
                key: index.toString(),
                ...item
            }
            return dataItem
        })
        // console.log(datas)
        s.data = datas
    }
    // console.log(s)
    return s
}
