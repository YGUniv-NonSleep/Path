import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";
import MapApi from "../../MapApi";
import { PathApi } from "../../OdsayApi";

function PathContainer() {
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let mapInfo = await MapApi();
            console.log(mapInfo.getInfo())
            let od = await PathApi.getDirection({
                sx: 126.9027279, sy: 37.5349277,
                ex: 126.9145430, ey: 37.5499421
            });
            console.log(od)
            setLoading(true);
            
        } catch(error) {
            console.log(error);
        }
    }

    async function mapClickEvent() {
        try {
            let mapInfo = await MapApi();
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
