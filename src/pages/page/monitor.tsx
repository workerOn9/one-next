// import Extremum from "@/pages/page/monsub/extremum"
// import {Button, Spacer, Switch} from "@nextui-org/react"
// import TableList from "./monsub/tableList"
// import Trend from "./monsub/trend"
// import React, {useEffect, useState} from "react"
// import {DatePicker, DatePickerProps} from "antd"
// import dayjs from "dayjs"
// import {PageRefreshIcon} from "@/components/PageRefreshIcon"
// import {LightIcon} from "@/components/Light"
// import {NightIcon} from "@/components/Night"
// import {useTheme} from "next-themes"

// 获取今日日期作为默认日期
// const today = new Date()
// const year = today.getFullYear()
// const month = String(today.getMonth() + 1).padStart(2, '0')
// const day = String(today.getDate()).padStart(2, '0')

function Monitor() {
    // const [locale, setLocale] = useState<any>()
    // useEffect(() => {
    //     (async () => {
    //         const zh_CN = (await import('antd/es/date-picker/locale/zh_CN')).default
    //         const en_US = (await import('antd/es/date-picker/locale/en_US')).default
    //         setLocale(zh_CN)
    //     })()
    // }, [])
    // const [dateSelect, setDateSelect] = useState(`${year}${month}${day}`)
    // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //     if (dateString) setDateSelect(dateString.replaceAll('-', ''))
    // }
    // const { theme, setTheme } = useTheme()
    // const handleThemeChange = () => {
    //     if (theme === 'light') setTheme('dark')
    //     else if (theme === 'dark') setTheme('light')
    // }

    // const [valueFromCopy, setValueFromCopy] = useState<string[]>([])
    // const onCopyChange = (parameter: any) => {
    //     console.info(parameter)
    //     if (parameter) {
    //         const arr = parameter.split(',').map((item: string) => {
    //             let i = item.split('_').filter((i) => i != null)
    //             return i[i.length - 1]
    //         })
    //         if (arr && arr.length > 0) setValueFromCopy(arr)
    //     }
    // }

    return (
        <div>nothing</div>
    )

    // return (
    //     <div style={{ padding: "10px 0", maxWidth: '90vw', maxHeight: '90vw', margin: '0 auto' }}>
    //         <Trend dateSelect={dateSelect} />
    //         <Spacer y={4} />
    //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //             <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
    //                 <DatePicker onChange={onChange} picker="date" defaultValue={dayjs(dateSelect, 'YYYYMMDD')} locale={locale} />
    //             </div>
    //             <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
    //                 <Switch defaultSelected size="md" color="warning" startContent={<LightIcon />} endContent={<NightIcon />} onChange={handleThemeChange}/>
    //                 <Spacer x={1} />
    //                 <Button size='sm' variant="light" endContent={<PageRefreshIcon /> } onPress={() => window.location.reload()}>页面刷新</Button>
    //             </div>
    //         </div>
    //         <Spacer y={4} />
    //         <Extremum dateSelect={dateSelect} onCopyChange={onCopyChange} />
    //         <Spacer y={4} />
    //         <TableList isDrill={false} inputDate={dateSelect} inputQueryIds={valueFromCopy} />
    //         <Spacer y={4} />
    //     </div>
    // )
}

export default Monitor