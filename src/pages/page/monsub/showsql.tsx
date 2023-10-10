import { Button, Card, CardBody, Spacer, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
// import useSWR from "swr"
import { DatePicker, DatePickerProps } from 'antd'
import Markdown from "@/components/Markdown"

interface requestData {
    data: dataProps
}

interface dataProps {
    statDate: string,
    queryId: string
}

// const fetcher = (url: string, body: any) => fetch(url, { method: 'POST', body }).then((res) => res.text())

function linkFetch(body: any) {
    const url = "https://bigdata-test.yingzhongshare.com/external-report-service/external/holoMonitor/getSql"
    return fetch(url, { method: 'POST', body }).then((res) => res.text())
}

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Showsql() {
    const [locale, setLocale] = useState<any>()
    useEffect(() => {
        (async () => {
            const zh_CN = (await import('antd/es/date-picker/locale/zh_CN')).default
            const en_US = (await import('antd/es/date-picker/locale/en_US')).default
            setLocale(zh_CN)
        })()
    }, [])

    const [dateSelect, setDateSelect] = useState(`${year}${month}${day}`)
    useEffect(() => {
        // console.info(dateSelect)
        setDateSelect(dateSelect)
    }, [dateSelect])

    const [requestBody, setRequestBody] = useState<any>(JSON.stringify({
        data: {
            statDate: dateSelect,
            queryId: ""
        }
    }))
    const [queryId, setQueryId] = useState<string>("")
    // useEffect(() => {
    //     setRequestBody(requestBody)
    // }, [requestBody])
    useEffect(() => {
        setQueryId(queryId)
    }, [queryId])
    const contentChange = (e: string) => {
        if (e) {
            console.log(e)
            setQueryId(e)
        }
    }

    const onChangeQueryIds = async () => {
        // console.log(queryIds)
        if (queryId && dateSelect) {
            // console.log(queryId, dateSelect)
            setDateSelect(dateSelect)
            setQueryId(queryId)
            const reqBody = JSON.stringify({
                data: {
                    queryId: queryId,
                    statDate: dateSelect
                }
            })
            setRequestBody(reqBody)
            const res = await linkFetch(reqBody)
            // console.log(requestBody, res)
            if (res) setData(JSON.parse(res).replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'))
        }
    }
    const [data, setData] = useState<any>()
    useEffect(() => {
        setData(data)
    }, [data])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log(date, dateString)
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    return (
        <div>
            <div>
                <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale} />
                <Spacer y={2} />
                <div style={{ display: 'inline', justifyContent: 'center' }}>
                    <Textarea label="QueryId" labelPlacement="inside" minRows={1} onValueChange={contentChange} fullWidth={false}/>
                    <Spacer y={1} />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color="primary" size="sm" radius="full" variant="flat" onPress={onChangeQueryIds}>Summit</Button>
                    </div>
                </div>
            </div>
            <Spacer y={2} />
            <Card>
                <CardBody>{data && <Markdown>{data}</Markdown>}</CardBody>
            </Card>
        </div>
    )
}

export default Showsql