import Extremum from "@/pages/page/monsub/extremum"
import { Spacer } from "@nextui-org/react"
import TableList from "./monsub/tableList"
import Trend from "./monsub/trend"
import React, {useEffect, useState} from "react"
import {DatePicker, DatePickerProps} from "antd"
import dayjs from "dayjs"

// 获取今日日期作为默认日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

function Monitor() {
    const [locale, setLocale] = useState<any>()
    useEffect(() => {
        (async () => {
            const zh_CN = (await import('antd/es/date-picker/locale/zh_CN')).default
            const en_US = (await import('antd/es/date-picker/locale/en_US')).default
            setLocale(zh_CN)
        })()
    }, [])
    const [dateSelect, setDateSelect] = useState(`${year}${month}${day}`)
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    }

    const [valueFromCopy, setValueFromCopy] = useState<string[]>([])
    const onCopyChange = (parameter: any) => {
        console.info(parameter)
        if (parameter) {
            const arr = parameter.split(',').map((item: string) => {
                let i = item.split('_').filter((i) => i != null)
                return i[i.length - 1]
            })
            if (arr && arr.length > 0) setValueFromCopy(arr)
        }
    }

    return (
        <div style={{ padding: "10px 0", maxWidth: '90vw', maxHeight: '90vw', margin: '0 auto' }}>
            <Trend dateSelect={dateSelect} />
            <Spacer y={4} />
            <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale} />
            <Spacer y={4} />
            <Extremum dateSelect={dateSelect} onCopyChange={onCopyChange} />
            <Spacer y={4} />
            <TableList isDrill={false} inputDate={dateSelect} inputQueryIds={valueFromCopy} />
            <Spacer y={4} />
        </div>
    )
}

export default Monitor