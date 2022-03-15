import { useEffect, useState } from "react";
import OderPresenter from "./OderPresenter"

function OderContainer() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <OderPresenter 
            loading = {loading}
        >
            </OderPresenter>
    )
}

export default OderContainer;
