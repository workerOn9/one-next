import Chat from "@/pages/page/chat"
import Query from "@/pages/page/home"
import Empty from "./Empty"
import Shengcao from "@/pages/page/shengcao"

export const Layout = ({ children, showContent }: { children: React.ReactNode, showContent: string }) => {
    return <div style={{ maxWidth: '90vw', margin: '0 auto', justifyContent: 'center' }}>
        {children}
        {(() => {
            switch (showContent) {
                case 'chat':
                    return <Chat />
                case 'query':
                    return <Query />
                case 'shengcao':
                    return <Shengcao />
                default:
                    return <Empty />
            }
        })()}
    </div>
}