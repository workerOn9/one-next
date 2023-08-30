import robot from "@/utils/datahandler"
import PostgresDatasource from "@/utils/datasource"
import { defaultSql, limitRegex } from "@/utils/sqlCommonArgs"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * typeorm example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let content = req.body ? req.body.sql : defaultSql
    const hasLimit = limitRegex.test(content)
    if (!hasLimit) {
        content = `${content.trim()} limit 10`
    }
    const link = await PostgresDatasource.initialize()
    try {
        const rawData = await link.query("select 1")
        if (rawData) {
            const sheet = robot(rawData)
            res.status(200).json({ sheet })
        } else {
            res.status(200).json({})
        }
    } catch (error) {
        res.status(500).json({ msg: "sorry, somethings wrong::" + error })
    } finally {
        await link.destroy()
    }
}