export type sheet = {
    header?: headers[],
    data?: datas[]
}

export type headers = {
    key: string,
    label: string
}

export type datas = {
    key: string,
    [key: string]: string
}
