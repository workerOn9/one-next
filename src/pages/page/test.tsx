import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const api = publicRuntimeConfig.API

function Test() {
    return <div style={{padding: '10px', margin: '0 auto'}}>
        {api}
    </div>
}

export default Test