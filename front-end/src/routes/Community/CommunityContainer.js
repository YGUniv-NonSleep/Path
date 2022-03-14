import { useEffect, useState } from "react";
import CommunityPresenter from "./CommunityPresenter"

function CommunityContainer() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CommunityPresenter 
            loading = {loading}
        >
            </CommunityPresenter>
    )
}

export default CommunityContainer;
