import { useEffect, useState } from "react";
import CompManage from "./CompManage";
import {useParams} from "react-router-dom"

function CompManageContainer() {

    const {comId} = useParams()

    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
        console.log(comId)
    }, []);

    return (
        <CompManage
            loading={loading}
            companyId = {comId}
        >
        </CompManage>
    )
}

export default CompManageContainer;