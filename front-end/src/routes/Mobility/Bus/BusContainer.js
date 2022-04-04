import { useEffect, useState } from "react";
import BusPresenter from "./BusPresenter";
import MapApi from "../../../MapApi";
import { MobilityApi } from "../../../OdsayApi";

function BusContainer() {
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

    async function busInfo(){
        let busNo = 410
        let busInfo = await MobilityApi.getBusId(busNo).catch((error) => console.log(error));
        // console.log(busInfo)

        let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
        // console.log(busDetailInfo)

        const bPoly = await MapApi().drawKakaoBusPolyLine(busDetailInfo.result.station)                           
        // console.log(bPoly)
        bPoly.setMap(map)
    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
        // busInfo()
    }, [map]);

    return (
        <BusPresenter 
            loading = {loading}
        >
            </BusPresenter>
    )
}

export default BusContainer;