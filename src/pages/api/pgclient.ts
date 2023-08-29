import { Client } from "pg"
import { NextApiRequest, NextApiResponse } from "next"
import robot from "@/utils/datahandler"

const connectionString = process.env.DATABASE_URL

const limitRegex = /(limit|fetch|top)\s+\d+/i
const defaultSql = "select 1 as test, current_date::text as today"

/**
 * native postgres example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const client = new Client({
        connectionString,
    })
    let content = req.body ? req.body.sql : defaultSql
    const hasLimit = limitRegex.test(content)
    if (!hasLimit) {
        content = `${content.trim()} limit 10`
    }
    // 发起连接
    await client.connect()
    // 执行查询
    const rawData = await client.query(content)
    if (rawData) {
        const result = rawData.rows
        const sheet = robot(result)
        res.status(200).json(sheet)
    } else {
        res.status(500).json({ msg: "sorry, somethings wrong" })
    }
    await client.end()
}