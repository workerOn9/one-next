import Extremum from "@/pages/page/monsub/extremum"
import { Spacer } from "@nextui-org/react"
import Tablelist from "./monsub/tablelist"
import Trend from "./monsub/trend"

function Monitor() {
    return (
        <div style={{ padding: "10px 0", maxWidth: '90vw', maxHeight: '90vw', margin: '0 auto' }}>
            <Trend />
            <Spacer y={4} />
            <Extremum />
            <Spacer y={4} />
            {Tablelist(false)}
            <Spacer y={4} />
        </div>
    )
}

export default Monitor