import { Button } from "@nextui-org/react";
import Head from "next/head";

const Page: React.FC = () => {
    return (
        <div>
            <Head>
                <title>One Next</title>
                <link rel="icon" href="/icon?<generated>" type="image/png" sizes="<generated>" />
                <meta
                    name="One Next"
                    content="good good study, day day up"
                    key="desc"
                />
            </Head>
            <h1>hello</h1>
            <div>
                <Button>click me</Button>
            </div>
        </div>
    )
}

export default Page
