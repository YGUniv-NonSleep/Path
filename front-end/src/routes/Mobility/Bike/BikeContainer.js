import { useEffect, useState } from "react";
import BikePresenter from "./BikePresenter";
import MapApi from "../../../MapApi";

function BikeContainer() {
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
        <BikePresenter 
            loading = {loading}
        >
            </BikePresenter>
    )
}

export default BikeContainer;