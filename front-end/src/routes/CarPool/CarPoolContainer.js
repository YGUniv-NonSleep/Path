import { useEffect, useState } from "react";
import CarPoolPresenter from "./CarPoolPresenter"

function CarPoolContainer() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading((current) => !current);
    }, []);

    return (
        <CarPoolPresenter 
            loading = {loading}
        >
            </CarPoolPresenter>
    )
}

export default CarPoolContainer;
