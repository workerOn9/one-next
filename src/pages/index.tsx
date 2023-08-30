import { LightIcon } from "@/components/Light"
import { NightIcon } from "@/components/Night"
import { PageLogo } from "@/components/PageLogo"
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import NextHead from "next/head"
import Query from "./page/home"

export default function Home() {
    // Theme
    const { theme, setTheme } = useTheme()
    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

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
            <Navbar shouldHideOnScroll={true} maxWidth="2xl" style={{ maxWidth: '95vw', margin: '0 auto' }}>
                <NavbarBrand>
                    <PageLogo />
                    <p className="font-bold text-inherit">ONE NEXT</p>
                </NavbarBrand>
                <NavbarContent className="sm:flex gap-4" justify="center">
                    <NavbarItem isActive>
                        <Button color="primary" variant="shadow" size="sm" radius="lg" disableAnimation={true}>
                            Home
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Link isBlock href="#" color="foreground">UnSelected</Link>
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
            {/* Content宽度控制 */}
            <div style={{ maxWidth: '90vw', margin: '0 auto' }}>
                <Query />
            </div>
        </main>
    )
}
