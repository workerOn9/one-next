import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import Markdown from "@/components/Markdown"

async function fetchSQL(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getSql"
    const res = await fetch(url, {method: 'POST', body})
    return await res.text()
}

async function fetchPlan(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getPlan"
    const res = await fetch(url, {method: 'POST', body})
    return await res.text()
}

/**
 * 提取SQL或者执行计划
 */
function ShowSQL({ isDrill, inputQueryId, inputDate, isForPlan }: {isDrill: boolean, inputQueryId?: string, inputDate?: string, isForPlan?: boolean}) {
    const [data, setData] = useState<any>()
    useEffect(() => {
        if (isForPlan) {
            const plan = async () => {
                const res = await fetchPlan(JSON.stringify({
                    data: {
                        queryId: inputQueryId,
                        statDate: inputDate
                    }
                }))
                if (res) setData(JSON.parse(res).replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'))
            }
            if (inputQueryId && inputDate) {
                plan().then(r => {})
            }
        } else {
            const sql = async () => {
                const res = await fetchSQL(JSON.stringify({
                    data: {
                        queryId: inputQueryId,
                        statDate: inputDate
                    }
                }))
                if (res) setData(JSON.parse(res).replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'))
            }
            if (inputQueryId && inputDate) {
                sql().then(r => {})
            }
        }
    }, [inputQueryId])

    return (
        <Card>
            <CardBody>{data && <Markdown>{data}</Markdown>}</CardBody>
        </Card>
    )
}

export default ShowSQL
