import { useEffect, useState } from "react";
import CompEdit from "./CompEdit";

function CompEditContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CompEdit
            loading={loading}
        >
        </CompEdit>
    )
}

export default CompEditContainer;