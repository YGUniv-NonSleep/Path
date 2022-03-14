import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";
import Maps from "../../MapApi";

function PathContainer() {
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let mapInfo = await Maps();
            setLoading(true);

            console.log(mapInfo().center)
            
        } catch(error) {
            console.log("load error");
        }
    }

    useEffect(() => {    
        mapLoad()
    }, []);

    return (
        <PathPresenter 
            loading = {loading}
        >
            </PathPresenter>
    )
}

export default PathContainer;
