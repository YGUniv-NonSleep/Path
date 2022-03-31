import { useEffect, useState } from "react";
import CompManage from "./CompManage";

function CompManageContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CompManage
            loading={loading}
        >
        </CompManage>
    )
}

export default CompManageContainer;