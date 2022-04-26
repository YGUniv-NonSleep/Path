import { useState, useEffect } from "react"
import axios from "axios"
import CompDetail from "./CompDetail"

function CompDetailContainer() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <CompDetail
            loading = {loading}
        ></CompDetail>
    )
}

export default CompDetailContainer