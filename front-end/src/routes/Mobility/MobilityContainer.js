import { useEffect, useState } from "react";
import MobilityPresenter from "./MobilityPresenter"

function MobilityContainer() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <MobilityPresenter 
            loading = {loading}
        >
            </MobilityPresenter>
    )
}

export default MobilityContainer;
