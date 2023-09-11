import { ChatMessage, GetChatCompletionsOptions } from "@azure/openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

const endpoint = process.env.AZURE_ENDPOINT
const key = process.env.AZURE_OPENAI_KEY

interface AzureChatCompletionsRequest extends GetChatCompletionsOptions {
    model?: string
    messages: ChatMessage[]
}

export const runtime = 'edge'

export default async function ask(req: Request) {

    const azureReq = await req.json() as AzureChatCompletionsRequest
    azureReq.stream = true
    const body = JSON.stringify(azureReq)

    const deploymentId = (azureReq.model) ? azureReq.model : process.env.AZURE_OPENAI_MODEL
    if (azureReq.model) delete azureReq.model
    const url = `${endpoint}openai/deployments/${deploymentId}/chat/completions?api-version=2023-05-15`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'api-key': `${key}`
        },
        body
    })

    const data = OpenAIStream(response)
    return new StreamingTextResponse(data)

}