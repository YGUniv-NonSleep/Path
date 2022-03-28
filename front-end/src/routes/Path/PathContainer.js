import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import MapApi from "../../MapApi";

function PathContainer() {
    const [map, settingMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [way, setWay] = useState(null); // 찾은 경로

    // MapApi 기능들 전부 함수화 시키기 호출할 때마다 필요 없는 것도 많이 호출 함.
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

    async function wayFind() {
        try {
            // 출발지, 도착지의 위도, 경도를 얻어왔다고 가정
            const startPoint = { la: 126.926493082645, ma: 37.6134436427887 }
            const arrivalPoint = { la: 127.126936754911, ma: 37.5004198786564 }
    
            let pathWay = await PathApi.getDirection({
                startPoint, arrivalPoint
            }).catch((error) => console.log(error));
            
            // pathWay 다양한 경로는 바로 아래에서..
            // const a = pathWay.path.map(mo => { return mo })
            // console.log(a)

            const BaseX = Math.floor(startPoint.la);
            const BaseY = Math.floor(startPoint.ma);
            const mo = pathWay.path.map(mo => { return mo.info.mapObj });
            const mapObj = `${BaseX}:${BaseY}@${mo[0]}`

            let graphicData = await PathApi.getGraphicRoute(
                mapObj
            ).catch((error) => console.log(error));
                
            console.log("여기까진?")
            
            const sp = await MapApi().drawKakaoMarker(startPoint.la, startPoint.ma)
            console.log(sp.setMap(map))
            sp.getMap(map)

            //settingMap(sp.setMap(map))
            //sp.settingMap(map)
            console.log("1")

            const ap = await MapApi().drawKakaoMarker(arrivalPoint.la, arrivalPoint.ma)
            //ap.setMap(map)
            console.log("2")
            
            // const dkpl = await MapApi().drawKakaoPolyLine(graphicData)
            // console.log(dkpl)
            console.log("3")

            console.log(graphicData.result.boundary)
            if(graphicData.result.boundary) {
                console.log("boundary ar")
            }

            //settingMap(map)
            //setWay(pathWay)
            

        } catch (error) {
            console.log(error)
        }
    }

    async function getMapInfo(mapData) {
        let info = await MapApi().getInfo(mapData);
        console.log(info)
        return info
    }
    

    // async function mapClickEvent() {
    //     try {
    //         let mapInfo = await MapApi().getLatLng();

    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // 처음 접속시 세팅 Effect Hook
    useEffect(() => {
        mapLoad()
    }, []);

    // 길 찾기 Hook
    useEffect(() => {
        wayFind()
    }, [way])

    useEffect(() => {
        getMapInfo(map)
        // mapClickEvent()
    }, [map]);

    return (
        <PathPresenter 
            loading = {loading}
        > 
        <TopNav></TopNav>
            </PathPresenter>
    )
}

export default PathContainer;
