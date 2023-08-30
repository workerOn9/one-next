import pg from "pg"
import { NextApiRequest, NextApiResponse } from "next"
import robot from "@/utils/datahandler"
import { defaultSql, limitRegex } from "@/utils/sqlCommonArgs"

const { Pool } = pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

/**
 * native postgres example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let content = req.body ? req.body.sql : defaultSql
    const hasLimit = limitRegex.test(content)
    if (!hasLimit) {
        content = `${content.trim()} limit 10`
    }
    // 发起连接
    const client = await pool.connect()
    try {
        // 执行查询
        const rawData = await client.query(content)
        const result = rawData.rows
        if (result) {
            const sheet = robot(result)
            res.status(200).json({ sheet })
        } else {
            res.status(200).json({})
        }
    } catch (error) {
        res.status(500).json({ msg: "sorry, somethings wrong::" + error })
    } finally {
        await client.release()
    }
}