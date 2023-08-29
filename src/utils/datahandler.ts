import { sheet, headers, datas } from "@/components/SheetStruct"

/**
 * 封装数据结构
 */
export default function robot(data: any): sheet {
    // console.log(data)
    const s: sheet = {}
    if (data && data.length > 0) {
        const res = data
        const header = res[0]
        const columns = Object.keys(header)
        const headers = columns.map((col) => {
            const headerItem: headers = {
                key: col,
                label: col
            }
            return headerItem
        })
        // console.log(headers)
        s.header = headers
        const datas = res.map((item: any, index: number) => {
            const dataItem: datas = {
                key: index.toString(),
                ...item
            }
            return dataItem
        })
        // console.log(datas)
        s.data = datas
    }
    // console.log(s)
    return s
}