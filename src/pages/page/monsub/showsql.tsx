import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import Markdown from "@/components/Markdown"

async function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getSql"
    const res = await fetch(url, {method: 'POST', body})
    return await res.text()
}

function ShowSQL({ isDrill, inputQueryId, inputDate }: {isDrill: boolean, inputQueryId?: string, inputDate?: string }) {
    const [data, setData] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            const res = await linkFetch(JSON.stringify({
                data: {
                    queryId: inputQueryId,
                    statDate: inputDate
                }
            }))
            if (res) setData(JSON.parse(res).replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'))
        }
        if (inputQueryId && inputDate) {
            fetchData().then(r => {})
        }
    }, [inputQueryId])

    return (
        <Card>
            <CardBody>{data && <Markdown>{data}</Markdown>}</CardBody>
        </Card>
    )
}

export default ShowSQL