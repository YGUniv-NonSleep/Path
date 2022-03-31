import { useEffect, useState } from "react";
import CompCreate from "./CompCreate";

function CompCreateContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CompCreate
            loading={loading}
        >
        </CompCreate>
    )
}

export default CompCreateContainer;