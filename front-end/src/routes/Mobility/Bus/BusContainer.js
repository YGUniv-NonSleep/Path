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
         //console.log(busInfo)

        let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch((error) => console.log(error));
         console.log(busDetailInfo)

        const bPoly = await MapApi().drawKakaoBusPolyLine(busDetailInfo.result.station)                           
        //console.log(bPoly)
        bPoly.setMap(map)

        const array = busDetailInfo.result.station;
        //console.log(array.length)
 
        // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 

        let points = null;
        points = new Array();

        for(var i=0; i<array.length; i++){
            points.push(new kakao.maps.LatLng(array[i].y, array[i].x))
        }
        //console.log(points)
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        
        var bounds = new kakao.maps.LatLngBounds();   
        for (var i = 0; i < points.length; i++) {
            var marker =  new kakao.maps.Marker({ position : points[i] });
            marker.setMap(map);
            
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
        }
        
        map.setBounds(bounds);

    }

    useEffect(() => {
        mapLoad()
    }, []);

    useEffect(() => {
         busInfo()
    }, [map]);

    return (
        <BusPresenter 
            loading = {loading}
        >
            </BusPresenter>
    )
}

export default BusContainer;