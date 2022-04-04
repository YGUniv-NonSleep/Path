import { useEffect, useState } from "react";
import PathPresenter from "./PathPresenter"
import MapApi from "../../MapApi";
import { PathApi } from "../../OdsayApi"

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
            // settingMap(createMap)
            setLoading(true);

        } catch(error) {
            console.log(error);
        }
    }

    async function wayFind() {
        try {
            // 출발지, 도착지의 위도, 경도를 얻어왔다고 가정
            const startPoint = { la: 126.93737555322481, ma: 37.55525165729346 }
            const arrivalPoint = { la: 126.88265238619182, ma: 37.481440035175375 }
    
            let pathWay = await PathApi.getDirection({
                startPoint, arrivalPoint
            }).catch((error) => console.log(error));
            
            // pathWay 다양한 경로는 바로 아래에서..
            // const a = pathWay.path.map(mo => { return mo })
            // console.log(a)

            // const BaseX = Math.floor(startPoint.la);
            // const BaseY = Math.floor(startPoint.ma);
            const mo = pathWay.path.map(mo => { return mo.info.mapObj });
            const mapObj = `${mo[0]}`

            let graphicData = await PathApi.getGraphicRoute(
                mapObj
            ).catch((error) => console.log(error));
            console.log(graphicData)
            
            const sp = await MapApi().drawKakaoMarker(startPoint.la, startPoint.ma)
            sp.setMap(map)

            const ap = await MapApi().drawKakaoMarker(arrivalPoint.la, arrivalPoint.ma)
            ap.setMap(map)
            
            const dkpl = await MapApi().drawKakaoPolyLine(graphicData)
            dkpl.setMap(map)

            // console.log(graphicData.result.boundary)
            if(graphicData.result.boundary) {
                // console.log("boundary ar")
                let points = [
                    new kakao.maps.LatLng(startPoint.ma, startPoint.la),
                    new kakao.maps.LatLng(arrivalPoint.ma, arrivalPoint.la)
                ]

                let bounds = new kakao.maps.LatLngBounds();

                for(var i=0; i<points.length; i++) {
                    bounds.extend(points[i])
                }

                // console.log(bounds)
                map.setBounds(bounds)

                const moving = moveMapLatLon(map.getCenter())
                map.panTo(moving)                

            }

        } catch (error) {
            console.log(error)
        }
    }

    async function getMapInfo(mapData) {
        let info = await MapApi().getInfo(mapData);
        console.log(info)
        return info
    }

    function moveMapLatLon(data) {
        let moveLatLon = new kakao.maps.LatLng(data.Ma, data.La-0.038);
        return moveLatLon
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
        // wayFind()
    }, [map])

    useEffect(() => {
        getMapInfo(map)
        // mapClickEvent()
    }, [map]);

    return (
        <PathPresenter 
            loading = {loading}
        >
            </PathPresenter>
    )
}

export default PathContainer;