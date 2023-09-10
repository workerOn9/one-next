import { NextApiRequest, NextApiResponse } from 'next';
import { Parser } from 'node-sql-parser'

export default function parser(req: NextApiRequest, res: NextApiResponse) {
    let content = req.body?.sql
    let dialect = req.body?.dialect
    const opt = {
        database: dialect || 'postgresql'
    }
    try {
        const parser = new Parser()
        const { ast } = parser.parse(content.replace(/::[^ ]+/g, ' '), opt)
        res.status(200).json(ast)
    } catch (error) {
        res.status(500).json({ msg: "sorry, somethings wrong::" + error })
    }
}