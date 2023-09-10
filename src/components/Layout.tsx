import Chat from "@/pages/page/chat"
import Query from "@/pages/page/home"
import Empty from "./Empty"

export const Layout = ({ children, showContent }: { children: React.ReactNode, showContent: string }) => {
    return <div style={{ maxWidth: '90vw', margin: '0 auto' }}>
        {children}
        {(() => {
            switch (showContent) {
                case 'chat':
                    return <Chat />
                case 'query':
                    return <Query />
                default:
                    return <Empty />
            }
        })()}
    </div>
}