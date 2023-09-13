import { ChatMessage, GetChatCompletionsOptions } from "@azure/openai"
import { StreamingTextResponse } from "ai"

const endpoint = process.env.AZURE_ENDPOINT
const key = process.env.AZURE_OPENAI_KEY

interface AzureChatCompletionsRequest extends GetChatCompletionsOptions {
    model?: string
    messages: ChatMessage[]
}

export const runtime = 'edge'

export default async function api(req: Request, res: Response) {
    const azureReq = await req.json() as AzureChatCompletionsRequest
    azureReq.stream = true
    const body = JSON.stringify(azureReq)

    const deploymentId = (azureReq.model) ? azureReq.model : process.env.AZURE_OPENAI_MODEL
    if (azureReq.model) delete azureReq.model
    const url = `${endpoint}openai/deployments/${deploymentId}/chat/completions?api-version=2023-05-15`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "text/event-stream",
            'Content-Type': 'application/json; charset=utf-8',
            'api-key': `${key}`
        },
        body
    })
    try {
        if (response && response.body) {
            const reader = response.body.getReader()
            const textDecoder = new TextDecoder()
            while (1) {
                const {done, value} = await reader.read()
                if (done) {
                    break;
                }
                const str = textDecoder.decode(value)
                console.log(str)
            }
        }
    } catch (error) {
        console.log(error)
    }
}