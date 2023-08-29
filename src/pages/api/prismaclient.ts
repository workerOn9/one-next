import robot from "@/utils/datahandler"
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const limitRegex = /(limit|fetch|top)\s+\d+/i
const defaultSql = "select 1 as test, current_date::text as today"

/**
 * prisma use example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // console.log(req.body)
    let content = req.body ? req.body.sql : defaultSql
    const hasLimit = limitRegex.test(content)
    if (!hasLimit) {
        content = `${content.trim()} limit 10`
    }
    const result = await prisma.$queryRawUnsafe(content)
    const resFormated = JSON.parse(JSON.stringify(result, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    // console.log(resFormated)
    const sheet = robot(resFormated)
    res.status(200).json({ sheet })
}
