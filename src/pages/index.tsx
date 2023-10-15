import { LightIcon } from "@/components/Light"
import { NightIcon } from "@/components/Night"
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import NextHead from "next/head"
import { useEffect, useState } from "react"
import { Layout } from "@/components/Layout"
import Image from "next/image"

export default function Home() {
    // Theme
    const { theme, setTheme } = useTheme()
    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }
    // Tab
    const [activeTab, setActiveTab] = useState('query')
    useEffect(() => {
        setActiveTab(activeTab)
    }, [activeTab])

    return (
        <main>
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
            <Layout showContent={activeTab}>
            <Navbar shouldHideOnScroll={true} style={{ maxWidth: '90vw', margin: '0 auto' }}>
                <NavbarBrand>
                    <Image src="/badage.png" width={32} height={32} alt={"me"} />
                </NavbarBrand>
                <NavbarContent className="sm:flex gap-4" justify="center">
                    <NavbarItem isActive={activeTab === 'query'}>
                        <Link isBlock color={activeTab === 'query' ? "primary" : "foreground"} onClick={() => setActiveTab('query')}>SQL探索</Link>
                    </NavbarItem>
                    <NavbarItem isActive={activeTab === 'chat'}>
                        <Link isBlock color={activeTab === 'chat' ? "primary" : "foreground"} onClick={() => setActiveTab('chat')}>聊天</Link>
                    </NavbarItem>
                    <NavbarItem isActive={activeTab === 'shengcao'}>
                        <Link isBlock color={activeTab === 'shengcao' ? "primary" : "foreground"} onClick={() => setActiveTab('shengcao')}>生草机</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link isBlock color={activeTab === 'none' ? "danger" : "foreground"} onClick={() => setActiveTab('none')}>未定</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Switch
                            defaultSelected
                            size="md"
                            color="warning"
                            startContent={<LightIcon />}
                            endContent={<NightIcon />}
                            onChange={handleClick}
                        />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            </Layout>
        </main>
    )
}
