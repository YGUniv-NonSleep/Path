import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import MapApi from "../../MapApi";
import { PathApi } from "../../OdsayApi";

function PathContainer() {
    //const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);

    async function mapLoad() {
        try {
            let mapInfo = await MapApi();
            //console.log(mapInfo.getInfo())

            setLoading(true);
            
        } catch(error) {
            console.log(error);
        }
    }

    async function wayFind() {
        try {
            const startPoint = {
                la: 126.9027279, ma: 37.5349277,
            }
            const arrivalPoint = {
                la: 126.9145430, ma: 37.5499421
            }
    
            let path = await PathApi.getDirection({
                startPoint, arrivalPoint
            }).catch((error) => console.log(error));

            console.log(path)
            //return path
            

        } catch (error) {
            console.log(error)
        }
    }

    // async function mapClickEvent() {
    //     try {
    //         let mapInfo = await MapApi().getLatLng();

    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
        wayFind()
    }, [])

    // useEffect(() => {
    //     mapClickEvent()
    // }, []);

    return (
        <PathPresenter 
            loading = {loading}
        >
            </PathPresenter>
    )
}

export default PathContainer;
