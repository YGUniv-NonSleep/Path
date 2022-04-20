import { useEffect, useState } from "react";
import Resign from "./Resign";

function ResignContainer() {
    // 여기서 api 같은거 가져와서 MemberPresenter로 props 넘겨줌.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <Resign
            loading={loading}
        >
        </Resign>
    )
}

export default ResignContainer;