import Markdown from "@/components/Markdown"
import { Card, CardBody, Button, Spacer, Textarea, ScrollShadow, Chip, CircularProgress, Tabs, Tab, Avatar } from "@nextui-org/react"
import Watermark from "@uiw/react-watermark"
import { useChat } from 'ai/react'
import { memo, useEffect, useRef, useState } from "react"

/**
 * 聊天对话窗口
 */
function Chat() {
    // 模型切换
    const [model, setModel] = useState("gpt35")
    const modelHandler = (e: any) => {
        // console.log(e)
        setModel(e)
    }
    useEffect(() => {
        setModel(model)
    }, [model])
    // 接口引擎
    const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({ api: '/api/azureai', body: { model } })
    // 自动滚动
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])
    // TODO 键盘事件
    return (
        <div style={{ margin: '0 auto' }}>
            <Tabs radius="sm" aria-label="model chooser" defaultSelectedKey="gpt35" style={{ display: 'flex', top: 10, justifyContent: 'center' }} onSelectionChange={modelHandler} color={model === 'gpt4' ? 'primary' : 'success'}>
                <Tab key="gpt35" title="GPT-3.5" />
                <Tab key="gpt4" title="GPT-4" />
            </Tabs>
            {/**聊天记录渲染 */}
            <Watermark content="workeron9.info">
            <ScrollShadow className="w-[300px] h-[400px]">
                <div ref={scrollRef} style={{ overflow: "auto", top: 5, padding: "0 10px", width: "100%", maxHeight: "75vh" }}>
                    {messages.map(m => {
                        return (
                            <li key={m.id} style={{ listStyleType: "none", display: 'flex', padding: "5px 10px", justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                {m.role != 'user' && <Chip variant="light" avatar={<Avatar name="ai" src="/azure.png"/>} />}
                                <Card style={{ maxWidth: '80vw' }}>
                                    <CardBody>
                                        <Markdown>{m.content}</Markdown>
                                    </CardBody>
                                </Card>
                            </li>
                        )
                    })}
                </div>
            </ScrollShadow>
            </Watermark>
            {/**错误渲染 */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>}
            {/**正在加载渲染 */}
            {isLoading && <div style={{ display: 'flex', padding: "10px 0", justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="primary" />
            </div>}
            <Spacer x={4} />
            {/**输入框渲染 */}
            <div style={{ position: "fixed", justifyContent: 'center', bottom: 10, padding: "0 10px", width: '90vw' }}>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        label="Chat"
                        labelPlacement="inside"
                        placeholder="哈喽,我是AI"
                        minRows={2}
                        fullWidth={true}
                        value={input}
                        onChange={handleInputChange}
                        isDisabled={isLoading}
                    />
                    <Spacer x={4} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="faded"
                            color="default"
                            size="sm"
                            >
                            undefined
                        </Button>
                        <Spacer y={2} />
                        <Button
                            variant="shadow"
                            color="success"
                            size="sm"
                            type="submit"
                            isLoading={isLoading}>
                            发送
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(Chat)