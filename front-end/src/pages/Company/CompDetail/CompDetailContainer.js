import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"
import CompDetail from "./CompDetail"

function CompDetailContainer() {
    const [loading, setLoading] = useState(false)
    const { comId } = useParams();  // 파라미터
    // console.log(comId);

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