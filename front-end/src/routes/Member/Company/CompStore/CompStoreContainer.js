import { useEffect, useState } from "react";
import CompStore from "./CompStore";

function CompStoreContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CompStore
            loading={loading}
        >
        </CompStore>
    )
}

export default CompStoreContainer;