import { useEffect, useState } from "react";
import PaymentsPresenter from "./PaymentsPresenter"

function PaymentsContainer() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <PaymentsPresenter 
            loading = {loading}
        ></PaymentsPresenter>
    )
}

export default PaymentsContainer;
