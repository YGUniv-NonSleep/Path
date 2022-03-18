import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";
import MapApi from "../../MapApi";
import TopNav from "../../Components/TopNav"

function PathContainer() {
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
        <PathPresenter 
            loading = {loading}
        > 
        <TopNav></TopNav>
            </PathPresenter>
    )
}

export default PathContainer;
