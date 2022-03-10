import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import axios from "axios";
import Maps from "../../Components/Maps";

function PathContainer() {
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        console.log("1차")
        Maps()    
        console.log("2차")
    }, []);

    return (
        <PathPresenter>
        <div id="map" style="width:600px;height:400px;"></div>
        </PathPresenter>
    )
}

export default PathContainer;