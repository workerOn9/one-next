import robot from "@/utils/datahandler"
import { defaultSql, limitRegex } from "@/utils/sqlCommonArgs"
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * prisma use example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let content = req.body ? req.body.sql : defaultSql
    const hasLimit = limitRegex.test(content)
    if (!hasLimit) {
        content = `${content.trim()} limit 10`
    }
    const prisma = new PrismaClient()
    try {
        const result = await prisma.$queryRawUnsafe(content)
        if (result) {
            // prisma 兼容 bigint 类型
            const resFormated = JSON.parse(JSON.stringify(result, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
            const sheet = robot(resFormated)
            res.status(200).json({ sheet })
        } else {
            res.status(200).json({})
        }
    } catch (error) {
        res.status(500).json({ msg: "sorry, somethings wrong::" + error })
    }
}
