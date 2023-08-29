import { sheet, headers, datas } from "@/components/SheetStruct"
import PostgresDatasource from "@/utils/datasource"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * typeorm example
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const link = await PostgresDatasource.initialize()
    const rawData = await link.query("select 1")
    if (rawData) {
        await link.destroy()
        res.status(200).json({ msg: "ok" })
    } else {
        res.status(500).json({ msg: "sorry" })
    }
}