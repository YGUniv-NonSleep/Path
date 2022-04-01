import { useEffect, useState } from "react";
import SubPresenter from "./SubPresenter";
import MapApi from "../../../MapApi";

function SubContainer() {
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
        <SubPresenter 
            loading = {loading}
        >
            </SubPresenter>
    )
}

export default SubContainer;