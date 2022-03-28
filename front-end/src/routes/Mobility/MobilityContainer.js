import { useEffect, useState } from "react";
import MobilityPresenter from "./MobilityPresenter"
import MapApi from "../../MapApi";

function MobilityContainer() {
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let mapInfo = await MapApi();
            setLoading(true);

            console.log(mapInfo().center)
            
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        mapLoad()
    }, []);

    return (
        <MobilityPresenter 
            loading = {loading}
        >
            </MobilityPresenter>
    )
}

export default MobilityContainer;
