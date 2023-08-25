import { NextApiRequest, NextApiResponse } from "next";

export default function serverCheck(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ result: 'server is running' })
}
