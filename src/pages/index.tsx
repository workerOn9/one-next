import { Button, Card, CardBody } from "@nextui-org/react"
import { useTheme } from "next-themes"
import NextHead from "next/head"

export default function Home() {
    const { theme, setTheme } = useTheme()
    const handleClick = () => {
        console.log(theme)
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <main>
            <div>
                <NextHead>
                    <title>One Next</title>
                    <meta key="title" content="good good study, day day up" property="og:title" />
                    <meta
                        key="viewport"
                        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                        name="viewport"
                    />
                    <link href="/icon.png" rel="icon" />
                </NextHead>
                <h1>hello</h1>
                <div>
                    <Button color="primary" radius="md" onPress={handleClick}>点我切换暗黑模式</Button>
                </div>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}
