import { CircularProgress } from "@nextui-org/react"

export default function Custom404() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress color="danger" label="404 not found or loading..." />
        </div>
    )
}