import { memo } from "react"
import ReactMarkdown, { Options } from "react-markdown"
import remarkGfm from 'remark-gfm'

function Markdown({ children, ...props }: Options) {
    return <ReactMarkdown remarkPlugins={[remarkGfm]} {...props}>{children}</ReactMarkdown>
}

export default memo(Markdown)