import "@/styles/globals.css"
import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes"
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider>
                <Component {...pageProps} />
                <Analytics />
            </NextThemesProvider>
        </NextUIProvider>
    )
}