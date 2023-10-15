import Markdown from "@/components/Markdown"
import { Button, Card, CardBody, Input, Spacer, Textarea } from "@nextui-org/react"
import { SoundFilled } from '@ant-design/icons'
import { useEffect, useState } from "react"

/**
 * Google生草机
 */
function Shengcao() {
    const [sourceContent, setSourceContent] = useState('')
    useEffect(() => {
        setSourceContent(sourceContent)
    }, [sourceContent])
    const sourceContentHandler = (str: string) => {
        setSourceContent(str)
    }

    const [repeatTimes, setRepeatTimes] = useState(2)
    const repeatTimesHandler = (str: string) => {
        if (str) {
            setRepeatTimes((str as unknown as number))
        }
    }

    const [isLoding, setIsLoding] = useState(false)
    useEffect(() => {
        setIsLoding(isLoding)
    }, [isLoding])

    const fetcher = async (url: string, body: string) => {
        setIsLoding(true)
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body,
            redirect: 'follow'
        }).then((result) => result)
        const data = res.ok ? res.text() : undefined
        setIsLoding(false)
        return data
    }

    const [targetContent, setTargetContent] = useState('')
    useEffect(() => {
        setTargetContent(targetContent)
    }, [targetContent])

    const contentHandler = async () => {
        if (sourceContent.length > 0) {
            let thisContent = encodeURIComponent(sourceContent)
            let url = `/api/shengcao?text=${thisContent}&to_language=zh-CN`
            const res = await fetcher(url, JSON.stringify({
                repeat: repeatTimes
            }))
            if (res) {
                setTargetContent(res)
            }
        }
    }

    const [onSpeaking, setOnSpeaking] = useState(false)
    const playText = (text: string) => {
        const synth = window.speechSynthesis
        let voices = synth.getVoices()
        const voiceMsg0 = new SpeechSynthesisUtterance()
        voiceMsg0.text = text
        // list all voices of chinese
        // voices.map(voice => {
        //   if (voice.lang.match(voicePattern)) console.log(voice)
        // })
        for (let index = 0; index < voices.length; index++) {
            // 如果是我用zh-HK
            if (voices[index].lang === 'zh-CN') {
                voiceMsg0.voice = voices[index]
                break
            } else {
                voiceMsg0.lang = 'zh-TW'
            }
        }
        !onSpeaking ? synth.speak(voiceMsg0) : synth.cancel()
    }

    const speakHandler = (text: string) => {
        setOnSpeaking(!onSpeaking)
        playText(text)
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto 10% auto" }}>
            <div style={{ maxWidth: "45vw" }}>
                <Textarea label="输入/Input" labelPlacement="inside" placeholder="输入原文/Write sth" minRows={50} onValueChange={sourceContentHandler} />
            </div>
            <div style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 50px"
            }}>
                <Input label="Repeat Times" defaultValue="2" labelPlacement="inside" isClearable={true} isRequired={true} size="sm" onValueChange={repeatTimesHandler}></Input>
                <Spacer y={5} />
                <Button color="success" size="sm" radius="none" onPress={contentHandler}>生草机/Shengcao</Button>
                <Spacer y={1} />
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "center", padding: "0 10px" }}>
                    <Button endContent={<SoundFilled />} size="sm" color="default" radius="full" style={{ padding: "10px 20px" }}
                        onPress={() => {
                            if (sourceContent) {
                                speakHandler(sourceContent)
                            }
                        }}
                    >Source</Button>
                    <Button endContent={<SoundFilled />} size="sm" color="primary" radius="full" style={{ padding: "10px 20px" }}
                        onPress={() => {
                            if (targetContent) {
                                speakHandler(targetContent)
                            }
                        }}
                    >Target</Button>
                </div>
            </div>
            <Card>
                <CardBody>
                    {isLoding ? 'Loading...' : (targetContent ? <Markdown>{targetContent}</Markdown> : 'None')}
                </CardBody>
            </Card>
        </div>
    )
}

export default Shengcao