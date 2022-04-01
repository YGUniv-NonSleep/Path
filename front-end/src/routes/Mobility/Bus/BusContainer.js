import { useEffect, useState } from "react";
import BusPresenter from "./BusPresenter";
import MapApi from "../../../MapApi";

function BusContainer() {
    const [map, setMap] = useState(null);
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
        <BusPresenter 
            loading = {loading}
        >
            </BusPresenter>
    )
}

export default BusContainer;