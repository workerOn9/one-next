import Extremum from "@/pages/page/monsub/extremum"
import {Spacer} from "@nextui-org/react"
import Nearby from "@/pages/page/monsub/nearby"
import Tablelist from "./monsub/tablelist"
import Showsql from "./monsub/showsql"

function Monitor() {
    return (
        <div style={{padding: "10px 0", maxWidth: '90vw', maxHeight: '90vw', margin: '0 auto'}}>
            <Extremum />
            <Spacer y={4}/>
            <Nearby />
            <Spacer y={4}/>
            <Tablelist />
            <Spacer y={4} />
            <Showsql />
        </div>
    )
}

export default Monitor