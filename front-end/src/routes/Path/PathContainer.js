import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";
import MapApi from "../../MapApi";

function PathContainer() {
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let mapInfo = await MapApi();
            console.log(mapInfo.getInfo())
            setLoading(true);
            
        } catch(error) {
            console.log(error);
        }
    }

    function mapClickEvent() {
        try {
            let mapInfo = MapApi();
            console.log(mapInfo.getLatLng())

        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
        mapClickEvent()
    }, []);

    return (
        <PathPresenter 
            loading = {loading}
        >
            </PathPresenter>
    )
}

export default PathContainer;
