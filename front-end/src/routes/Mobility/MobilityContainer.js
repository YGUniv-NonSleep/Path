import { useEffect, useState } from "react";
import MobilityPresenter from "./MobilityPresenter";
import MapApi from "../../MapApi";

function MobilityContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let createMap = await MapApi().createMap();
            let setController = await MapApi().setController(createMap);
            settingMap(setController);
            setLoading(true);

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
